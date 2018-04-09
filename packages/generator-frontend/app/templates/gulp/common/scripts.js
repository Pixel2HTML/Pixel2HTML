const gulp = require('gulp')
const webpack = require('webpack')
const webpackConfig = require('../../webpack.config')

gulp.task('scripts', () =>
  new Promise(resolve => webpack(webpackConfig, (err, stats) => {
    if (err) console.log('Webpack', err)
    console.log(stats.toString({
      chunks: false,
      colors: true
    }))
    resolve()
  }))
)
