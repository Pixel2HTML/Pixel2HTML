const gulp = require('gulp')
const compilator = require('@pixel2html/scripts-frontend')

gulp.task('start', () => compilator('development'))
gulp.task('build', () => compilator('production'))
gulp.task('debug', () => compilator('debug'))

gulp.task('default', gulp.series('start'))
