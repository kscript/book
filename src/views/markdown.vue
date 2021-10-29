<template>
  <div class="article-container">
    <h1>{{id}}</h1>
    <vue-markdown :md="md" :html="html" :id="id"></vue-markdown>
  </div>
</template>
<script>
import hljs from 'highlight.js'
import markdown from 'markdown-it'
import { defineComponent, reactive, toRefs } from 'vue'
import VueMarkdown from '@/components/markdown'
import { getMarkdown, transform } from '@/utils/markdown'
import config from '@/config'
export default defineComponent({
  components: {
    VueMarkdown
  },
  props: {
    path: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const result = reactive({
      id: (props.name || props.path),
      html: '',
      md: {}
    })
    try {
      getMarkdown(`${config.docsPath}/${props.path}${props.name ? '/' + props.name : ''}${config.docsExt}`).then(res => res.text()).then(data => {
        return markdown({
          html: true,
          linkify: true,
          typographer: true,
          langPrefix: 'hljs language-',
          highlight (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
              try {
                return hljs.highlight(lang, str).value
              } catch (__) {}
            }
            return ''
          }
        }).render(transform(data))
      }).then(html => {
        Object.assign(result, {
          html
        })
      })
    } catch (err) {
      console.log(err)
    }
    return {
      ...toRefs(result)
    }
  }
})
</script>
<style lang="scss">
.article-container{
  width: 1100px;
  margin: 0px auto;
  padding: 20px 50px;
  background: #fff;
  box-sizing: border-box;
}
</style>
