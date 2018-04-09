const gulp = require('gulp')
const config = require('../gulp.config')
const $ = require('gulp-load-plugins')()

gulp.task('images', () =>
  gulp.src(config.src.images)
    .pipe($.changedInPlace({ firstPass: true }))
    .pipe($.rename(config.flatten))
    .pipe($.rename({ dirname: '', prefix: '' }))
    .pipe(gulp.dest(config.theme + '/assets'))
)
