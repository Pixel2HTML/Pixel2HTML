// We use this to read flags in the command line
const { argv } = require('yargs')
const { env } = require('process')

const production = !!argv.prod || !!argv.production
const debug = !!argv.debug
const mode = debug
  ? 'debug'
  : production
    ? 'production'
    : 'development'

module.exports = {
  theme: 'dist',
  shopify: {
    key: env.SHOP_KEY,
    pass: env.SHOP_PASSWORD,
    secret: env.SHOP_SECRET,
    themeId: env.SHOP_THEME_ID,
    shopName: env.SHOP_NAME,
    flatFolders: [
      'assets',
      'config',
      'layout',
      'locales',
      'templates'
    ],
    multiLevelFolders: [
      'sections',
      'snippets'
    ]
  },
  src: {
    styles: './src/styles',
    scripts: 'src/scripts',
    fonts: [
      './src/fonts/**/*'
    ],
    icons: [
      './src/icons/**/*'
    ],
    images: [
      './src/images/**/*.{svg,png,jpg,jpeg,gif,ico}'
    ],
    shopify: [
      './src/theme/**/*'
    ],
    theme: './src/theme'
  },
  onError: function (error) {
    console.log(error.toString())
    production
      ? process.exit(1)
      : this.emit('end')
  },
  production,
  debug,
  mode,
  // For autoprefixer
  browsers: [
    'last 2 Chrome versions',
    'last 2 ChromeAndroid versions',
    'last 2 Firefox versions',
    'last 2 Safari versions',
    'last 2 ios versions',
    'last 1 ie versions',
    'last 2 Edge versions',
    'last 2 Opera versions'
  ],
  appendLiquidExt: path => {
    if (path.extname === '.map') return
    if (path.extname === '.css') {
      path.extname = '.scss'
    }
    path.basename += path.extname
    path.extname = '.liquid'
  },
  makeLiquidSourceMappingURL: file => `{{ "${file.relative}.map" | asset_url }}`,
  flatten: path => {
    if (path.dirname !== '.') {
      path.basename = path.dirname.replace('/', '_') + '_' + path.basename
    }
  }
}
