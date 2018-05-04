const gulp = require('gulp')
const { compiler } = require('@pixel2html/scripts-frontend')
const { mode } = require('../config.js')

gulp.task('scripts', () => compiler(mode))
