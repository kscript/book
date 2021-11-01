export const loadScript = (url: string, callback: () => void): void => {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = url
  script.onload = callback
  document.body.appendChild(script)
}
export const loadStyle = (url: string): void => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.type = 'text/css'
  link.href = url
  document.head.appendChild(link)
}
