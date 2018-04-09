const gulp = require('gulp')
const config = require('../gulp.config')
const $ = require('gulp-load-plugins')()

gulp.task('icons', function () {
  return gulp.src(config.src.icons)
    .pipe($.svgmin({
      plugins: [
        {
          removeStyleElement: true
        },
        {
          removeAttrs: {
            attrs: ['fill', 'stroke', 'fill.*', 'stroke.*']
          }
        }
      ],
      js2svg: { pretty: true }
    }))
    .pipe($.svgstore({inlineSvg: true}))
    .pipe($.rename('svg-icons.liquid'))
    .pipe(gulp.dest(config.theme + '/snippets'))
})
