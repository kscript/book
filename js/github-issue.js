var Hooks = (function() {
  var repository = 'qappleh/Interview'
  var cache = (function() {
    var cacheData = {}
    function get (name, value, successCB, failCB) {
      var item = cacheData[name]
      if (item) {
        if (Date.now() <= item.expire || item.expire === 0) {
          typeof successCB === 'function' && successCB(item.value)
          return item.value
        } else {
          delete cacheData[name]
        }
      }
      if (typeof failCB === 'function') {
        var result = failCB(name)
        if (result !== void 0) {
          return result
        }
      }
      return value || null
    }
    function set (name, value, timeout) {
      if (isNaN(timeout) || timeout < 0) {
        timeout = 60
      }
      cacheData[name] = {
        value: value,
        expire: timeout ? Date.now() + timeout * 1e3 : 0
      }
      return value
    }
    function remove (name) {
      delete cacheData[name]
    }
    function clear () {
      for (var i in cacheData) {
        delete cacheData[i]
      }
    }
    return {
      get,
      set,
      remove,
      clear
    }
  })()
  function tpl (content, data) {
    content = typeof content === 'string' ? content : ''
    data = data instanceof Object ? data : {}
    return content.replace(/\$\{(.*?)\}/g, function(s, s1) {
      return data[s1] || s1
    })
  }
  function filterTag(content) {
    content = typeof content === 'string' ? content : ''
    return content.replace(/(<|>)/g, function(s, s1) {
      return {
        '<': '&lt;',
        '>': '&gt;'
      }[s1]
    })
  }
  function each(list, func) {
    func = typeof func === 'function' ? func : function () {}
    var result = []
    if (list instanceof Array) {
      for (var i = 0; i < list.length; i++) {
        result.push(func(list[i], i, list))
      }
    }
    return result
  }
  function getInfo (fetch,  successCB, failCB) {
    fetch(tpl('https://api.github.com/repos/${repository}', {repository: repository}))
    .then(function (r){
      return r.json()
    })
    .then(function(data) {
      cache.set('info', data, 60)
      typeof successCB === 'function' && successCB(data)
    })
    .catch(failCB)
  }
  function getIssues(fetch, pageno, successCB, failCB) {
    pageno = isNaN(pageno) || pageno < 1 ? 1 : ~~pageno 
    return fetch(tpl('https://api.github.com/repos/${repository}/issues?page=${pageno}', {repository: repository, pageno: pageno}))
      .then(function (r){
        return r.json()
      })
      .then(function (data) {
        var content = each(data, function (item) {
          item.title = filterTag(item.title)
          return tpl('<router-link to="/markdown/${number}">${title}</router-link><br/>', item)
        }).join('')
        if (typeof successCB === 'function') {
          successCB(content)
        }
      })
      .catch(failCB)
  }
  return {
    onCreateApp: function(app, libs) {
      cache.set('app', app, 0)
      cache.set('libs', libs, 0)
    },
    onGetMarkdown: function(context, options) {
      var instance = context.instance
      var fetch = context.fetch
      var path = instance.props.path
      var name = instance.props.name
      if (path === 'index') {
        window.pageChange = function(pageno) {
          cache.get('libs', {}, function(libs) {
            libs.router.push({
              path: '/markdown/index/' + pageno
            })
          })
        }
        function showPage (info) {
          var pageno = isNaN(name) || name < 1 ? 1 : ~~name
          var pagination = tpl('<el-pagination layout="prev, pager, next" :total="${total}" :page-size="30" :current-page="${pageno}" @current-change="pageChange"></el-pagination>', {
            total: info.open_issues,
            pageno: pageno
          })
          cache.get('index/' + pageno, '', function (content) {
            options.white(content + pagination, {})
          }, function () {
            getIssues(fetch, pageno, function(content) {
              cache.set('index', content, 120)
              options.white(content + pagination, {})
            })
          })
        }
        cache.get('info', {}, function (info) {
          showPage(info)
        }, function() {
          getInfo(fetch, function(info) {
            showPage(info)
          })
        })
      } else if (path) {
        fetch('https://api.github.com/repos/' + repository + '/issues/' + path)
        .then(r => r.json())
        .then(data => {
          document.title = data.title
          options.white(options.formatMarkdown('## ' + filterTag(data.title) + '\n' + filterTag(data.body) + '\n\n>原文链接: [' + filterTag(data.title) + '](' + data.html_url + ')'), {})
        })
      }
      return false
    }
  }
})()