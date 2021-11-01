import config from '@/config'
export const fetchApi = (url: string, option?: RequestInit): Promise<Response> => {
  return fetch(/^(http(s|):|\/\/)/.test(url) ? url : `${config.baseUrl}${url}`, Object.assign({
    mode: 'cors'
  }, option))
}
export default fetchApi
