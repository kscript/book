import config from '@/config'
export const fetchApi = (url: string) => {
  return fetch(`${config.baseUrl}${url}`)
}
export default fetchApi
