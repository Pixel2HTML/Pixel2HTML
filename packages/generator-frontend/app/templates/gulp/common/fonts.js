const gulp = require('gulp')
const config = require('../config')

gulp.task('fonts', () =>
  gulp.src(config.project.fontFiles)
    .pipe(gulp.dest(config.directories.dist.fonts))
)
