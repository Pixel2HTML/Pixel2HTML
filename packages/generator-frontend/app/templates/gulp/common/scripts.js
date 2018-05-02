const gulp = require('gulp')
const compilator = require('@pixel2html/scripts-frontend')
const { mode } = require('../config.js')

gulp.task('scripts', () => compilator(mode))
