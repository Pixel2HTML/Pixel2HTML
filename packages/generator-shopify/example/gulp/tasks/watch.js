const gulp = require('gulp')
const config = require('../gulp.config')

const createShopifyWatchTask = name => {
  gulp.watch(config.src.theme + `/${name}/**/*`, gulp.series(`shopify:${name}`))
}
const SHOPIFY_FOLDERS = [
  ...config.shopify.flatFolders,
  ...config.shopify.multiLevelFolders
]

gulp.task('watch', done => {
  gulp.watch(config.src.fonts, gulp.series('fonts'))
  gulp.watch(config.src.icons, gulp.series('icons'))
  gulp.watch(config.src.images, gulp.series('images'))
  gulp.watch(config.src.scripts + '/**/*', gulp.series('scripts'))
  gulp.watch(config.src.styles + '/**/*', gulp.series('styles'))
  SHOPIFY_FOLDERS.forEach(createShopifyWatchTask)
  done()
})