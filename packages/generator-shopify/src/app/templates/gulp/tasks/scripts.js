const gulp = require('gulp')
const webpack = require('webpack')
const webpackConfig = require('../../webpack.config')
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages')

gulp.task('scripts', () =>
  new Promise(resolve => webpack(webpackConfig, (err, stats) => {
    if (err) console.log('Webpack', err)
    var rawMessages = stats.toJson({}, true)
    var messages = formatWebpackMessages(rawMessages)
    if (!messages.errors.length && !messages.warnings.length) {
      console.log(stats.toString({
        chunks: false,
        colors: true
      }))
    }
    if (messages.errors.length) {
      console.log('Failed to compile.')
      messages.errors.forEach(e => console.log(e))
      resolve()
    }
    if (messages.warnings.length) {
      console.log('Compiled with warnings.')
      messages.warnings.forEach(w => console.log(w))
    }
    resolve()
  }))
)
