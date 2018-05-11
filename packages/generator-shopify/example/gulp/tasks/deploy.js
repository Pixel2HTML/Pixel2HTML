const gulp = require('gulp')
const watch = require('gulp-watch')
const config = require('../gulp.config')
const shopify = require('gulp-shopify-theme')
const theme = shopify.create()

const browserSync = require('browser-sync')

const reload = () => {
  browserSync.reload()
}

const shopifyConfig = {
  api_key: config.shopify.key,
  password: config.shopify.pass,
  shared_secret: config.shopify.secret,
  shop_name: config.shopify.shopName,
  theme_id: config.shopify.themeId
}

const validKeys = Object.keys(shopifyConfig).filter(key => shopifyConfig[key])
const CAN_DEPLOY = validKeys.length > 0

const themeFiles = config.theme + '/{assets,layout,config,snippets,templates,locales,sections}/**/*'

gulp.task('theme:init', done => {
  if (CAN_DEPLOY) theme.init(shopifyConfig)
  done()
})

gulp.task('theme:watch', done =>
  CAN_DEPLOY
    ? watch(themeFiles, {verbose: true})
      .pipe(theme.stream(undefined, () => {
        reload()
        done()
      })).on('error', config.onError)
    : done()
)

gulp.task('theme:upload', () => CAN_DEPLOY
  ? gulp.src(themeFiles)
    .pipe(theme.stream())
    .on('error', config.onError)
  : null
)

gulp.task('deploy', gulp.series('theme:init', 'theme:upload'))

// Danger Zone 💀
gulp.task('theme:purge', function (done) {
  theme.purge()
  done()
})
gulp.task('kill:theme', gulp.series('theme:init', 'theme:purge'))
