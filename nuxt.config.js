const bodyParser = require('body-parser')
// const sleepProducts = require('./assets/json/sleepProducts.json')
// const sleepQuestion = require('./assets/json/sleepQuestion.json')
export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      // { name: "google-site-verification",
      //   content: "TaWpD9i4R5GSPzJjnTc8--t-g8bbDKbfxQX-xxxxxxx" },
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    // script: [
    //   { src: '//www.instagram.com/embed.js' }
    // ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      { rel: 'icon', type: 'image/x-icon', href: '/h-logo-white.ico' }, //static
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.6.3/css/all.css'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/sass/styles.scss'],
  /*
   ** Plugins to load before mounting the App
   */

  plugins: [
    //firebase
    '~/plugins/firebase',
    //proxy
    { src: '~/plugins/axios', ssr: false },
    //localStorage
    { src: '~/plugins/localStorage.js', ssr: false },
    //vue-carousel
    { src: '~/plugins/vue-carousel', ssr: false },
    //transition on scroll
    { src: '~plugins/scroll.js', ssr: false },
    //filter orijinal
    '~/plugins/filter.js'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    // ['@nuxtjs/google-analytics', { id: 'UA-xxxxxxxx-5' }],
    // '@nuxtjs/sitemap',
    '@nuxtjs/markdownit',
    '@nuxtjs/dotenv'
    // 'nuxt-buefy'
  ],
  // buefy: {
  //   // css: false,
  //   materialDesignIcons: false
  // },

  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASEURL: process.env.FIREBASE_DATABASEURL,
    FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID,
    FIREBASE_STORAGEBUCKET: process.env.FIREBASE_STORAGEBUCKET,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY
  },
  /**
   * add for API
   */
  serverMiddleware: [{ path: '/api', handler: '~/api/index.js' }],

  styleResources: {
    sass: ['~/assets/sass/variable.scss']
  },
  //devModules: ['@nuxtjs/eslint-module'],
  // sitemap: {
  //   hostname: 'https://romantic-kare-6d357c.netlify.com/',
  //   generate: true,
  //   routes:[
  //     "/",
  //     {
  //       url: '/works',
  //       changefreq: 'daily',
  //       priority: 1,
  //       lastmodISO: '2017-06-30T13:30:00.000Z'
  //     },
  //     "/about",
  //     "/contact"
  //   ]
  // },

  generate: {
    routes: [
      // '/thisIsSleep/buy/puroducts/1001',
      // '/thisIsSleep/buy/puroducts/1002',
      // '/thisIsSleep/buy/puroducts/1003',
      // '/thisIsSleep/buy/puroducts/1004',
      // '/thisIsSleep/solution/userSolution/1001',
      // '/thisIsSleep/solution/userSolution/1002',
      // '/thisIsSleep/solution/userSolution/1003',
      // '/thisIsSleep/solution/userSolution/1004',
      '/thisIsSleep/solution/question/1',
      '/thisIsSleep/solution/question/2',
      '/thisIsSleep/solution/question/3',
      '/thisIsSleep/solution/question/4',
      '/thisIsSleep/buy/1001',
      '/thisIsSleep/buy/1002',
      '/thisIsSleep/buy/1003',
      '/thisIsSleep/buy/1004'
    ]
  },
  // generate: {
  //   routes() {
  //     // return sleepProducts.map((pro) => {
  //     //   return `/thisIsSleep/buy/puroducts/${pro.id}`
  //     // })
  //     return sleepQuestion.map((question) => {
  //       return `/thisIsSleep/solution/question/${question.pid}`
  //     })
  //   }
  // },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/errors/404.vue')
      })
    }
  },
  // markdownit: {
  //   preset: 'default',
  //   injected: true,
  //   breaks: true,
  //   html: true,
  //   linkify: true,
  //   typography: true,
  //   xhtmlOut: true,
  //   langPrefix: 'language-',
  //   quotes: '“”‘’',
  //   highlight: function(/*str, lang*/) {
  //     return ''
  //   }
  // },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true
  },
  // cors
  proxy: {
    // '/api/': {target: 'YOUR API URL', pathRewrite: {'^/api/': '/'}}
    '/function': {
      target:
        'https://us-central1-nuxt-univ-create-gae-todo.cloudfunctions.net/sendgrid',
      pathRewrite: {
        '^/function': '/'
      }
    }
    // '/api':
    //   'https://us-central1-nuxt-univ-create-gae-todo.cloudfunctions.net/sendgrid '
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {}
    extend(config, ctx) {
      config.node = {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
      }
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
    //autoprefixer
    // build: {
    //   postcss: [
    //     require('autoprefixer')({
    //       grid: true
    //     })
    //   ]
    // }
  }
}
