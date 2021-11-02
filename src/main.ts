import { loadScript, loadStyle } from './utils'
import { config } from './config'

const load = async (queue: string[], callback: (item: string, resolve: (value: unknown) => void, reject: (value: unknown) => void) => void, keep: boolean) => {
  if (Array.isArray(queue) && queue.length) {
    if (keep) {
      let stack: Promise<unknown> = Promise.resolve()
      queue.forEach(item => {
        stack = stack.then(() => {
          return new Promise((resolve: (value: unknown) => void, reject: (value: unknown) => void) => {
            callback(item, resolve, reject)
          })
        })
      })
      await stack
    } else {
      await Promise.all(
        queue.map(item => {
          return new Promise((resolve, reject) => {
            callback(item, resolve, reject)
          })
        })
      )
    }
  }
}

Promise.all([
  load(config.scripts, (item, resolve) => {
    loadScript(item, () => resolve(true))
  }, true),
  load(config.styles, (item, resolve) => {
    loadStyle(item)
    resolve(true)
  }, true)
]).then(() => {
  const { loadApp } = require('./app')
  loadApp()
})
