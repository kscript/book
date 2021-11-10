import fetch from '@/utils/fetch'
import config from '@/config'
import { ComponentInternalInstance, getCurrentInstance } from 'vue'
type Func = (...rest: unknown[]) => unknown
declare const Hooks: {
  [prop: string]: Func;
}
const empty = () => {
  return void 0
}
export const getContext = (instance?: ComponentInternalInstance | null) => {
  instance = instance || getCurrentInstance()
  return {
    instance,
    config,
    fetch
  }
}
export const noop = (func?: Func): Func => {
  return typeof func === 'function' ? func : empty
}
export const emitHook = (method: string): Func => {
  if (typeof Hooks === 'undefined') {
    return empty
  }
  return noop(Hooks[method])
}
export const emitCB = (condition: unknown, cb: () => void) => {
  if (condition !== false) {
    return cb()
  }
}
