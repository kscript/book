import { loadScript, loadStyle } from './utils'
import storage from '@/utils/storage'
import { config, updateConfig } from './config'

const mergeBase = (config: buildConfig['config']) => {
  const baseConfig = storage.get('baseConfig') as buildConfig['config']
  if (baseConfig instanceof Object) {
    for (const i in baseConfig) {
      type key = keyof buildConfig['config']
      const old = config[i as key]
      const now = baseConfig[i as key]
      if (!(old instanceof Object) && !(now instanceof Object)) {
        Object.assign(config, {
          [i]: baseConfig[i as key]
        })
      }
    }
  }
}
const mergeResources = (config: buildConfig['config'], key: 'scripts' | 'styles') => {
  const resources = storage.get(key)
  if (Array.isArray(resources)) {
    const list: scriptOption[] = []
    const nameMap: {
      [prop: string]: scriptOption
    } = {}
    resources.forEach(item => {
      item.default = item.default || false
    })
    config[key].concat(resources).forEach(item => {
      if (nameMap[item.name]) {
        Object.assign(nameMap[item.name], item)
      } else {
        list.push(nameMap[item.name] = Object.assign({}, item))
      }
    })
    Object.assign(config, {
      [key]: list
    })
  }
}
console.log({
  storage, config
})
updateConfig((config) => {
  mergeBase(config)
  mergeResources(config, 'styles')
  mergeResources(config, 'scripts')
})
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
  load(config.scripts.filter(item => item.enable).map(item => item.path), (item, resolve) => {
    loadScript(item, () => resolve(true))
  }, true),
  load(config.styles.filter(item => item.enable).map(item => item.path), (item, resolve) => {
    loadStyle(item)
    resolve(true)
  }, true)
]).then(() => {
  const { loadApp } = require('./app')
  loadApp()
})
