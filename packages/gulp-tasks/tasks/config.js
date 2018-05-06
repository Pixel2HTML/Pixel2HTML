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
  directories: {
    src: {
      base: 'src',
      markup: 'src/pug',
      fonts: 'src/assets/fonts',
      icons: 'src/assets/icons',
      images: 'src/assets/images',
      scripts: 'src/assets/js',
      styles: 'src/assets/styles',
      cssModules: 'src/assets/cssModules/css.json'
    },
    dist: {
      base: 'dist',
      markup: 'dist',
      fonts: 'dist/assets/fonts',
      icons: 'dist/assets/icons',
      images: 'dist/assets/images',
      scripts: 'dist/assets/js',
      styles: 'dist/assets/css',
    }
  },
  project: {
    cssFiles: 'src/assets/styles/main/**/!(_)*.scss',
    cssVendorFile: 'src/assets/styles/vendor/vendor.scss',
    jsMainFile: 'src/assets/js/index.js',
    fontFiles: [
      'src/assets/fonts/**/*'
    ]
  },
  onError: function (error) {
    console.log(error.toString())
    production
      ? process.exit(1)
      : this.emit('end')
  },
  src: 'src',
  dist: 'dist',
  production,
  debug,
  mode,
  tunnel,
  // Stuff for PurifyCss
  purify: ['./dist/**/*.js', './dist/**/*.html']
}
