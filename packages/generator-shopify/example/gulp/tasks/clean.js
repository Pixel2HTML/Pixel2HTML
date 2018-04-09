const gulp = require('gulp')
const config = require('../gulp.config')
const del = require('del')

gulp.task('clean', function() {
  return del([config.theme, 'releases'])
})