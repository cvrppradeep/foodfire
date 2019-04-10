import { PROXY, ANALYTICS_TRACKING_ID, head, manifest } from "./config";
import helmet from 'helmet'
import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
export default {
  mode: 'universal',
  head,
  manifest,
  // loading: '~/components/Loading.vue',
  css: ['~assets/styles/reset.css', '~assets/styles/transitions.css', '~assets/style/app.styl'],
  plugins: [
    '~/plugins/filters.js',
    '~/plugins/vuetify',
    { src: '~plugins/lazy', ssr: false },
    { src: '~/plugins/scroll.js', ssr: false },
    { src: '~plugins/swal.js', ssr: false }
  ],
  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
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
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
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
