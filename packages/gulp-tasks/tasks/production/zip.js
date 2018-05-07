const gulp = require('gulp')
const zip = require('gulp-zip')
const { dist, onError } = require('../config')

gulp.task('zip', () => {
  const distFiles = [
    `${dist}/**`,
    `!${dist}`
  ]

  return gulp.src(distFiles, {base: '.'})
    .pipe(zip('latest.zip')).on('error', onError)
    .pipe(gulp.dest('dist/releases'))
})
