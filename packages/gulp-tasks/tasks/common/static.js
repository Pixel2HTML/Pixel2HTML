const gulp = require('gulp')
const del = require('del')
const { src, dist } = require('../config')

gulp.task('clean', () =>
  del([
    dist,
    `${src}/assets/cssModules/css.json`
  ])
)

gulp.task('images', () =>
  gulp.src(`${src}/assets/images/**/*`)
    .pipe(gulp.dest(`${dist}/assets/images`))
)

gulp.task('head', () =>
  gulp.src(`${src}/assets/head/**/*`)
    .pipe(gulp.dest(`${dist}/assets/head`))
)
