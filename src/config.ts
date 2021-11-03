const { config: _config } = require('../build/config') as buildConfig
export const updateConfig = (merge?: (config: buildConfig['config']) => void): buildConfig['config'] => {
  if (typeof merge === 'function') {
    merge(_config)
  }
  return _config
}
export const config = updateConfig()
export default config
