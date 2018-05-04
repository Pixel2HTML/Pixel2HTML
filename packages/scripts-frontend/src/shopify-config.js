import getShopifyPlugins from './config/shopify-plugins/getPlugins'
import { cwd } from 'process'
import { join } from 'fs'
import { isDebug } from './config/tools/checkEnv'

const makePath = filePath => join(cwd(), filePath)

const createShopifyConfig = config => {
  config.entry.main = makePath('src/scripts')

  config.output = {
    // Only output js when debugging
    // otherwise we want .js.liquid for external sourcemapa support
    filename: isDebug() ? '[name].js' : '[name].js.liquid',
    path: makePath('.deploy/assets')
  }

  config.plugins = getShopifyPlugins()

  // Opt out of default to play nice with liquid
  config.mode = 'none'

  // Host jQuery outside of the bundle
  // so other plugins can use it as well
  config.externals = {
    jquery: 'jQuery'
  }

  // Split vendor code
  // by default all code coming from node_modules
  config.optimization = {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
        },
      },
    },
  }

  return config
}

export default createShopifyConfig
