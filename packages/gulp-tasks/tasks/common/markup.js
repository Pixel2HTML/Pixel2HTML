const gulp = require('gulp')
const { readFileSync } = require('fs')
const pug = require('gulp-pug')
const postHtml = require('gulp-posthtml')
const cssModules = require('posthtml-css-modules')
const imgAutoSize = require('posthtml-img-autosize')
const prettify = require('gulp-html-prettify')

const { src, dist, production, onError } = require('../config')

gulp.task('markup', () =>
  gulp.src(`${src}/pug/*.pug`)
    .pipe(pug({
      basedir: `${src}/pug`,
      locals: {
        icon: name => readFileSync(`./src/assets/icons/${name}.svg`),
        production
      }
    }))
    .pipe(postHtml([
      cssModules(`./${src}/assets/cssModules/css.json`),
      imgAutoSize({
        root: `./${dist}`,
        processEmptySize: true
      })
    ]))
    .pipe(prettify())
    .on('error', onError)
    .pipe(gulp.dest(`${dist}`))
)
