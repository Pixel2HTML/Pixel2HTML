const gulp = require('gulp')
const { src, dist, production, onError } = require('../config')
const when = require('gulp-if')

const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')
const moduleImporter = require('sass-module-importer')

const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const browsers = require('@pixel2html/browserlist')
const postCssModules = require('postcss-modules')
const path = require('path')
const set = require('lodash.set')

const concat = require('gulp-concat')

const fs = require('fs-path')
const cssModules = {}
const getJSON = () => JSON.stringify(cssModules, null, 2)

gulp.task('main:styles', () =>
  // All scss files starting without underscore
  gulp.src(`${src}/assets/styles/main/**/!(_)*.scss`)
    .pipe(when(!production, sourcemaps.init()))
    .pipe(sass({ importer: moduleImporter() }))
    .pipe(postcss([
      autoprefixer({ browsers }),
      postCssModules({
        generateScopedName: production
          ? '[hash:base64:5]'
          : '[name]__[local]___[hash:base64:5]',
        getJSON: (cssPath, json) => {
          const pathWithoutExtension = cssPath.split('.css')[0]
          const exploded = pathWithoutExtension.split(path.sep)
          const mainIndex = exploded.indexOf('main')
          const dirs = exploded.slice(mainIndex + 1)
          set(cssModules, dirs, json)
        }
      }),
    ]))
    .pipe(concat('main.css'))
    .pipe(when(!production, sourcemaps.write('.')))
    .on('error', onError)
    .pipe(gulp.dest(`${dist}/assets/css`))
)

gulp.task('writeModules', done => {
  const json = getJSON()
  fs.writeFileSync(`${src}/assets/cssModules/css.json`, json)
  done()
})

gulp.task('vendor:styles', () =>
  gulp.src(`${src}/assets/styles/vendor/vendor.scss`)
    .pipe(when(!production, sourcemaps.init()))
    .pipe(sass({ importer: moduleImporter() }))
    .pipe(postcss([
      autoprefixer({ browsers }),
    ]))
    .pipe(concat('vendor.css'))
    .pipe(when(!production, sourcemaps.write('.')))
    .on('error', onError)
    .pipe(gulp.dest(`${dist}/assets/css`))
)

gulp.task('styles', gulp.series('main:styles', 'vendor:styles', 'writeModules'))
