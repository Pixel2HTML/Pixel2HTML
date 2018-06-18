import getShopifyPlugins from './config/shopify-plugins/getPlugins'
import { cwd } from 'process'
import { join } from 'path'
import { checkDebug } from './config/tools/checkEnv'

const makePath = filePath => join(cwd(), filePath)

const createShopifyConfig = config => {
  const shouldBeDebugMode = checkDebug()
  config.entry.main = makePath('src/scripts')

  config.output = {
    // Only output js when debugging
    // otherwise we want .js.liquid for external sourcemapa support
    filename: '[name].js',
    chunkFilename: '[name].chunk.[chunkhash:5].js',
    path: makePath('.deploy/assets')
  }

  config.devtool = shouldBeDebugMode
    ? 'source-map'
    : 'inline-cheap-module-source-map'

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
