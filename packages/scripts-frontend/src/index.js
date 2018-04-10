import webpack from 'webpack'
import config from './config'

const compileJS = mode => new Promise(resolve =>
  webpack(config, (err, stats) => {
    if (err) console.log('Webpack', err)
    console.log(stats.toString({
      chunks: false,
      colors: true
    }))
    resolve()
  })
)
