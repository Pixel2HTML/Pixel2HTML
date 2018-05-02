import webpack from 'webpack'
import getConfig from './config/index'
import setEnv from './setEnv'
import { userConfig } from './config/paths'
import { existsSync } from 'fs'

const compileJS = mode => {
  if (mode === 'production' || mode === 'debug') {
    setEnv('production')
  } else {
    setEnv('development')
  }

  const defaultConfig = getConfig()

  const customConfig = existsSync(userConfig)

  const config = customConfig
    // Let's do it the Next.js way
    ? require(userConfig)(defaultConfig, webpack)
    : defaultConfig
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
