'use strict'
// We use this to read flags in the command line
const argv = require('yargs').argv
// Add your conditions here 💅
const production = !!argv.prod || !!argv.production
const debug = !!argv.debug
const tunnel = !!argv.tunnel

const mode = debug
  ? 'debug'
  : production
    ? 'production'
    : 'development'

module.exports = {
  src: 'src',
  dist: 'dist',
  production,
  debug,
  mode,
  tunnel,
  // Stuff for PurifyCss
  purify: ['./dist/**/*.js', './dist/**/*.html'],
  onError: function (error) {
    console.log(error.toString())
    production
      ? process.exit(1)
      : this.emit('end')
  },
}
