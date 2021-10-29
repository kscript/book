import fetchApi from './fetch'
export const transform = (src: string) : string => {
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
export const getMarkdown = (url: string): Promise<Response> => {
  return fetchApi(url)
}
