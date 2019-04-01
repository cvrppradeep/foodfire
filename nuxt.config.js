import { PROXY, ANALYTICS_TRACKING_ID, head, manifest } from "./config";
import helmet from 'helmet'
export default {
  mode: 'universal',
  head,
  manifest,
  // loading: '~/components/Loading.vue',
  css: ['~assets/styles/reset.css', '~assets/styles/transitions.css'],
  plugins: [
    '~/plugins/filters.js',
    { src: '~plugins/lazy', ssr: false },
    { src: '~/plugins/scroll.js', ssr: false }
  ],
  modules: [
    '@nuxtjs/sitemap',
    'nuxt-robots-module',
    '@nuxtjs/toast',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/component-cache',
    'nuxt-client-init-module',
    'cookie-universal-nuxt',
    ['@nuxtjs/google-analytics', { id: ANALYTICS_TRACKING_ID }]
  ],
  axios: {
    baseURL: PROXY + '/api/',
    browserBaseURL: '/api/',
    proxy: true,
    credentials: true
  },
  proxy: {
    '/api': PROXY,
    '/auth': PROXY,
    '/images': PROXY,
    '/groceries': PROXY,
  },
  toast: {
    theme: "bubble",
    position: 'top-center',
    singleton: true
  },
  render: {
    gzip: { level: 1 },
    http2: { push: true },
    static: {
      maxAge: "1y"
    },
    bundleRenderer: {
      shouldPreload: (file, type) => {
        if (type === 'script') {
          const ignoredRoutes = ['legal']
          if (ignoredRoutes.some(r => file.includes(r))) {
            return false
          }
        }
        return ['script', 'style', 'font'].includes(type)
      }
    }
  },
  router: { middleware: ['auth'] },
  serverMiddleware: [
    helmet({
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
    })
  ],

  build: {
    app: 'app.[chunkhash].js',
    chunk: '[name].[chunkhash].js',
    extractCSS: true,
    optimization: {
      splitChunks: {
        name: true
      }
    }
  },
  sitemap: {
    path: '/sitemap.xml',
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    generate: false,
    exclude: ['/my/**']
  }
}
