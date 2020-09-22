export default {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: [],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        { src: './plugins/vue-slick-carousel.js' }, { src: './plugins/scroll.js' }, { src: './plugins/lottie.js' }
    ],
    axios: {
        baseURL: 'http://134.122.108.145/'
    },
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
        '@nuxtjs/tailwindcss',
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        // Doc: https://github.com/nuxt-community/dotenv-module
        // '@nuxtjs/dotenv',
        // 'nuxt-purgecss',
        'cookie-universal-nuxt'
    ],

    purgeCSS: {
        // your settings here

        // mode: MODES.webpack,
        enabled: ({ isDev, isClient }) => (!isDev && isClient), // or `false` when in dev/debug mode
        paths: [
            'components/**/*.vue',
            'layouts/**/*.vue',
            'pages/**/*.vue',
            'plugins/**/*.js'
        ],
        styleExtensions: ['.css'],
        whitelist: ['nav--shadowed'],
        whitelistPatterns: [/^v-lazy-*/, /^slick-*/, /-(leave|enter|appear)(|-(to|from|active))$/, /^(?!(|.*?:)cursor-move).-move$/, /^router-link(|-exact)-active$/],
        whitelistPatternsChildren: [/^v-lazy-*/, /^slick-*/],
        extractors: [{
            extractor: class {
                static extract(content) {
                    return content.match(/[A-z0-9-:\\/]+/g)
                }
            },
            extensions: ['html', 'vue', 'js']
        }]

    },

    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {},
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {}
    }
}