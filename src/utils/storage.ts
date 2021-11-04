export class WebStorage {
  #prefix = ''
  constructor (prefix = '') {
    this.#prefix = prefix + '_'
  }

  get (key: string, defaultValue: unknown = null): string | unknown {
    const value = localStorage.getItem(this.#prefix + key)
    try {
      const data = JSON.parse(value || '')
      if (data.expire !== 0 && data.expire - Date.now() <= 0) {
        localStorage.removeItem(this.#prefix + key)
        return defaultValue
      }
      return data.value
    } catch (err) {
    }
    return defaultValue
  }

  getData (key: string): {
    [prop: string]: unknown
  } {
    try {
      const value = this.get(key, '{}') as string
      const data = JSON.parse(value)
      if (data instanceof Object) {
        return data
      }
    } catch (err) {
    }
    return {}
  }

  set (key: string, value: string | unknown, expire: number = Date.now() + 10 * 24 * 3600 * 1000): void {
    const data = {
      value,
      expire
    }
    localStorage.setItem(this.#prefix + key, JSON.stringify(data))
  }

  clear (): void {
    localStorage.clear()
  }

  remove (key: string): void {
    localStorage.removeItem(this.#prefix + key)
  }
}
export const storage = new WebStorage('book')
export default storage
