import fetchApi from './fetch'
import jsyaml from 'js-yaml'
interface yamlOptions {
  [propName: string]: any;
}
export interface extractResult {
  markdown: string;
  yaml: yamlOptions;
}
const parseYaml = (yaml: string): yamlOptions => {
  try {
    const config = jsyaml.load(yaml) || {}
    if (config instanceof Object) {
      return config
    }
    console.log('配置信息读取失败!')
  } catch (err) {
    console.log(err)
  }
  return {}
}
export const transform = (src: string): string => {
  const start = '<!--'
  const end = '-->'
  const regS = new RegExp(start, 'g')
  const regE = new RegExp(end, 'g')
  const strMap: {
    [prop: string]: string
  } = {
    '{{': '\\{\\{',
    '}}': '\\}\\}',
    '<': '&lt;',
    '`': '\\`'
  }
  let curr = regS.exec(src)
  try {
    while (curr) {
      const startIndex = curr.index + start.length
      const text = src.slice(startIndex)
      const next = regE.exec(text)
      if (next) {
        src = `${src.slice(0, curr.index)}${src.slice(startIndex, startIndex + next.index).replace(/(\{\{|\}\}|`|<)/g, (s) => {
          return strMap[s] || ''
        })}${src.slice(startIndex + next.index + end.length)}`
        regS.lastIndex = regE.lastIndex = 0
        curr = regS.exec(src)
      } else {
        break
      }
    }
  } catch (err) {
    console.log(err)
  }
  return src
}
export const extract = (content: string, type?: 'markdown' | 'yaml') : extractResult | string | yamlOptions => {
  const strs = (' ' + content).split('---')
  const resObj = {
    markdown: strs.slice(0, 1).concat(strs.slice(2).join('---')).join('').slice(1),
    yaml: parseYaml(strs[1] || '')
  }
  return type ? resObj[type] || resObj.markdown : resObj
}
export const getMarkdown = (url: string): Promise<Response> => {
  return fetchApi(url)
}
