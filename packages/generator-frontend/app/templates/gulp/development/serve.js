const gulp = require('gulp')
const config = require('../config')
const browserSync = require('browser-sync')
const openBrowser = require('react-dev-utils/openBrowser')
const WebpackDevServerUtils = require('react-dev-utils/WebpackDevServerUtils')
const { prepareUrls, choosePort } = WebpackDevServerUtils

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
          baseDir: config.directories.dist.base,
          serveStaticOptions: {
            extensions: ['html']
          }
        },
        open: false,
        logConnections: true,
        tunnel: config.tunnel,
        logPrefix: 'Pixel2Html',
        files: ['**/*.css']
      })
      openBrowser(urls.localUrlForBrowser)
      done()
    })
})
