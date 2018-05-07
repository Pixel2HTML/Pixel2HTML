const gulp = require('gulp')
const { dist, purify } = require('../config')
const purifyCss = require('gulp-purifycss')

gulp.task('purify', () =>
  gulp.src(`${dist}/assets/css/*.css`)
    .pipe(purifyCss(purify, { info: true }))
    .pipe(gulp.dest(`${dist}/assets/css`))
)
