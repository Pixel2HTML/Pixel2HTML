const gulp = require('gulp')
const config = require('../config')
const zip = require('gulp-zip')

gulp.task('zip', () => {
  const distFiles = [
    `${config.directories.dist.base}/**`,
    `!${config.directories.dist.base}`
  ]

  return gulp.src(distFiles, { base: '.' })
    .pipe(zip('latest.zip')).on('error', config.onError)
    .pipe(gulp.dest('dist/releases'))
})
