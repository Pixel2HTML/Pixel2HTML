const gulp = require('gulp')
const config = require('../gulp.config')
const when = require('gulp-if')
const $ = require('gulp-load-plugins')()
const production = config.production
const moduleImporter = require('sass-module-importer')

const destination = config.theme + '/assets'

// Remove unused styles config
const purifyWatch = [
  '.deploy/layout/**/*.liquid',
  '.deploy/snippets/**/*.liquid',
  '.deploy/sections/**/*.liquid',
  '.deploy/templates/**/*.liquid',
  '.deploy/assets/**/*.js',
  '.deploy/assets/**/*.js.liquid',
]

gulp.task('main:styles', () =>
  gulp.src(config.src.styles + '/main.scss')
    .pipe(when(!production, $.sourcemaps.init()))
    .pipe($.sass({ importer: moduleImporter() }))
    .on('error', $.sass.logError)
    .pipe($.autoprefixer({
      browsers: config.browsers
    }))
    .pipe(when(production, $.groupCssMediaQueries()))
    .pipe(when(production, $.csscomb()))
    .pipe(when(production, $.purifycss(purifyWatch, { info: true })))
    .pipe(when(!production, $.sourcemaps.write('.', {
      sourceMappingURL: config.makeLiquidSourceMappingURL
    })))
    .pipe(when(production, $.cssnano()))
    .pipe($.rename(config.appendLiquidExt)) // main.css.liquid
    .pipe(gulp.dest(destination))
)

gulp.task('vendor:styles', () =>
  gulp.src(config.src.styles + '/vendor.scss')
    .pipe(when(!production, $.sourcemaps.init()))
    .pipe($.sass({ importer: moduleImporter() }))
    .on('error', $.sass.logError)
    .pipe($.autoprefixer({
      browsers: config.browsers
    }))
    .pipe(when(production, $.groupCssMediaQueries()))
    .pipe(when(production, $.csscomb()))
    .pipe(when(production, $.purifycss(purifyWatch, { info: true })))
    .pipe(when(!production, $.sourcemaps.write('.', {
      sourceMappingURL: config.makeLiquidSourceMappingURL
    })))
    .pipe(when(production, $.cssnano()))
    .pipe($.rename(config.appendLiquidExt)) // vendor.css.liquid
    .pipe(gulp.dest(destination))
)

gulp.task('styles', gulp.parallel('main:styles', 'vendor:styles'))
