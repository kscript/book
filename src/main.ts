import { loadApp } from './app'
import { loadScript, loadStyle } from './utils'
import { config } from './config'
const load = (list: string[], callback: (item: string, resolve: (value: unknown) => void, reject: (value: unknown) => void) => void) => {
  if (Array.isArray(list) && list.length) {
    return Promise.all(
      list.map(item => {
        return new Promise((resolve, reject) => {
          callback(item, resolve, reject)
        })
      })
    )
  }
}
Promise.all([
  load(config.scripts, (item, resolve) => {
    loadScript(item, () => resolve(true))
  }),
  load(config.styles, (item, resolve) => {
    loadStyle(item)
    resolve(true)
  })
]).then(() => {
  loadApp()
})
