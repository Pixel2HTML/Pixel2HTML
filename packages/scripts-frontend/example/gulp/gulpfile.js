const gulp = require('gulp')
const { compiler } = require('@pixel2html/scripts-frontend')

gulp.task('start', () => compiler('development'))
gulp.task('build', () => compiler('production'))
gulp.task('debug', () => compiler('debug'))

gulp.task('default', gulp.series('start'))
