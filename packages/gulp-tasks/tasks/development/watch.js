const gulp = require('gulp')
const browserSync = require('browser-sync')
const { src } = require('../config')

const reload = done => {
  browserSync.reload()
  done()
}

const createWatcher = extraWatchers => {
  gulp.task('watch', done => {
    // static files
    gulp.watch(`${src}/pug/**/*.pug`, gulp.series('markup', reload))
    gulp.watch(`${src}/assets/icons/**/*.svg`, gulp.series('markup', reload))
    gulp.watch(`${src}/assets/images/**/*`, gulp.series('images', reload))
    gulp.watch(`${src}/assets/head/**/*`, gulp.series('head', reload))
    gulp.watch(`${src}/assets/fonts/**/*`, gulp.series('fonts', reload))

    // styles
    gulp.watch(`${src}/assets/styles/**/*.scss`, gulp.series('styles'))
    // Scripts
    gulp.watch(`${src}/assets/js/**/*.js`, gulp.series('scripts', reload))

    extraWatchers(reload)
    done()
  })
}

module.exports = createWatcher
