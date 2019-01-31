// Configuration for your app
const webpack = require('webpack')
const path = require('path')
const envparsers = require('./config/envparser')

module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: [
      'i18n',
      'axios',
      'firebase-plugin',
      'vuefire',
      'vue-croppie',
      'vue-geolocation',
      'vue-progressive-image'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons',
      'fontawesome'
      // 'ionicons',
      // 'mdi',
    ],
    supportIE: false,
    build: {
      env: envparsers(),
      scopeHoisting: true,
      distDir: 'dist',
      // vueRouterMode: 'history',
      vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack(cfg) {
        cfg.plugins.push(
          new webpack.ProvidePlugin({
            mapboxgl: 'mapbox-gl'
          })
        )
        cfg.resolve.alias = {
          ...cfg.resolve.alias, // This adds the existing alias
          'env': path.resolve(__dirname, 'config/helpers/env.js'),
          '@components': path.resolve(__dirname, './src/components'),
          '@src': path.resolve(__dirname, './src')
        }
      }
    },
    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QLayout',
        'QLayoutHeader',
        'QLayoutDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QListHeader',
        'QItem',
        'QItemMain',
        'QItemSide',
        'QCard',
        'QCardTitle',
        'QCardMain',
        'QCardMedia',
        'QCardSeparator',
        'QCardActions',
        'QTable',
        'QSearch',
        'QCheckbox',
        'QField',
        'QInput',
        'QUploader',
        'QInputFrame',
        'QItemTile',
        'QProgress',
        'QSpinner',
        'QSpinnerBars',
        'QModal',
        'QCarousel',
        'QCarouselSlide',
        'QCarouselControl'
      ],
      directives: [
        'Ripple',
        'CloseOverlay',
        'BackToTop'
      ],
      // Quasar plugins
      plugins: [
        'Notify',
        'SessionStorage',
        'AddressbarColor',
        'AppFullscreen'
      ]
      // iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
      // i18n: 'de' // Quasar language
    },
    // animations: 'all' --- includes all animations
    animations: [],
    ssr: {
      pwa: false
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack (cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
