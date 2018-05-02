import webpack from 'webpack'
import getConfig from './config/index'
import setEnv from './setEnv'

const compileJS = mode => {
  setEnv(mode)
  const defaultConfig = getConfig()

  const config = defaultConfig
  return new Promise(resolve =>
    webpack(config, (err, stats) => {
      if (err) console.log('Webpack', err)
      console.log(stats.toString({
        chunks: false,
        colors: true
      }))
      resolve()
    })
  )
}

export default compileJS
