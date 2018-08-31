const gulp = require('gulp')
const config = require('../config')
const purify = require('@pixel2html/pipes').purify

gulp.task('purify', () =>
  gulp.src(config.directories.dist.styles + '*.css')
    .pipe(purify({ paths: config.purify })())
    .pipe(gulp.dest(config.directories.dist.styles))
)
