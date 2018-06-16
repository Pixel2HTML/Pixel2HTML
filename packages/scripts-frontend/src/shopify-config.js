import getShopifyPlugins from './config/shopify-plugins/getPlugins'
import { cwd } from 'process'
import { join } from 'path'

const makePath = filePath => join(cwd(), filePath)

const createShopifyConfig = config => {
  config.entry.main = makePath('src/scripts')

  config.output = {
    // Only output js when debugging
    // otherwise we want .js.liquid for external sourcemapa support
    filename: '[name].js',
    chunkFilename: '[name].chunk.[chunkhash:5].js',
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

  return config
}

export default createShopifyConfig
