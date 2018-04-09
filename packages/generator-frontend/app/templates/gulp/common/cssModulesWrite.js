const gulp = require('gulp')
const config = require('../config')
const fs = require('fs-path')
const getJSON = require('@pixel2html/pipes').getJSON

gulp.task('writeModules', done => {
  const json = getJSON()
  fs.writeFileSync(config.directories.src.cssModules, json)
  done()
})
