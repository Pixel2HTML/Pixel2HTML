const gulp = require('gulp')
const { tunnel, dist } = require('../config')
const browserSync = require('browser-sync')
const openBrowser = require('react-dev-utils/openBrowser')
const WebpackDevServerUtils = require('react-dev-utils/WebpackDevServerUtils')
const {prepareUrls, choosePort} = WebpackDevServerUtils

gulp.task('browser-sync', done => {
  const DEFAULT_PORT = 3000
  const HOST = '0.0.0.0'
  const protocol = 'http'
  choosePort(HOST, DEFAULT_PORT)
    .then(port => {
      if (port === null) return
      const urls = prepareUrls(protocol, HOST, port)
      browserSync.init({
        port,
        server: {
          baseDir: dist,
          serveStaticOptions: {
            // pretty urls index.html can be just index
            extensions: ['html']
          }
        },
        open: false,
        logConnections: true,
        tunnel,
        logPrefix: 'Pixel2Html',
        // HMR all the css things
        files: ['**/*.css']
      })
      openBrowser(urls.localUrlForBrowser)
      done()
    })
})
