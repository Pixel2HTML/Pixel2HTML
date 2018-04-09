const dotenv = require('dotenv')
dotenv.config()

const gulp = require('gulp')
const requireDir = require('require-dir')

requireDir('gulp', {
  recurse: true
})

gulp.task('build', gulp.series(
  'clean',
  'fonts',
  'icons',
  'images',
  'scripts',
  'styles',
  'shopify'
))

gulp.task('release', gulp.series('build', 'zip'))

gulp.task('serve', gulp.parallel(
  'browser-sync',
  'theme:init',
  'theme:watch',
  'watch'
))

gulp.task('full-deploy', gulp.series('build', 'deploy'))

gulp.task('default', gulp.series('build', 'serve'))
