import webpack from 'webpack'
import getConfig from './config/index'
import setEnv from './setEnv'
import { userConfig } from './config/paths'
import { existsSync } from 'fs'

const compileJS = mode => {
  setEnv(mode)
  const defaultConfig = getConfig()

  const customConfig = existsSync(userConfig)
    ? require(userConfig)
    : {}

  const config = Object.assign(defaultConfig, customConfig)
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
