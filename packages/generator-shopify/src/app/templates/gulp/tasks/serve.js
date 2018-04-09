const gulp = require('gulp')
const config = require('../gulp.config')
const browserSync = require('browser-sync')
const WebpackDevServerUtils = require('react-dev-utils/WebpackDevServerUtils')
const {choosePort} = WebpackDevServerUtils

const DEFAULT_PORT = 3000
const HOST = '0.0.0.0'

gulp.task('browser-sync', done => {
  choosePort(HOST, DEFAULT_PORT)
    .then(port => {
      if (port === null) {
        return
      }
      browserSync.init({
        port,
        open: true,
        logConnections: true,
        logPrefix: 'Pixel2Html',
        proxy: `https://${config.shopify.shopName}.myshopify.com`,
        startPath: `?preview_theme_id=${config.shopify.themeId}`,
        reloadDebounce: 2000
      })
      done()
    })
})
