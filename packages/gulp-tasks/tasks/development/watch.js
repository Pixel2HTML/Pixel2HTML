const gulp = require('gulp')
const browserSync = require('browser-sync')
const config = require('../config')

const reload = done => {
  browserSync.reload()
  done()
}

const createWatcher = extraWatchers => {
  gulp.task('watch', done => {
    // static files
    gulp.watch(config.directories.src.markup + '/**/*.pug', gulp.series('markup', reload))
    gulp.watch(config.directories.src.icons + '/**/*.svg', gulp.series('markup', reload))
    gulp.watch(config.directories.src.images + '/**/*', gulp.series('images', reload))
    gulp.watch(config.directories.src.base + '/assets/head/**/*', gulp.series('head', reload))
    // Fonts
    gulp.watch(config.project.fontFiles, gulp.series('fonts', reload))
    // styles
    gulp.watch(config.directories.src.styles + '/**/*.scss', gulp.series('styles'))
    // Scripts
    gulp.watch(config.directories.src.scripts + '/**/*.js', gulp.series('scripts', reload))

    extraWatchers(reload)
    done()
  })
}

module.exports = createWatcher
