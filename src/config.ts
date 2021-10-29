export const config = {
  docsPath: process.env.NODE_ENV === 'development' ? 'book/' : '/docs/book/',
  docsExt: '.md',
  baseUrl: process.env.NODE_ENV === 'development' ? '/' : '/book/'
}
export default config
