const {
  createShopifyConfig
} = require('@pixel2html/scripts-frontend')

module.exports = config => {
  const newConfig = createShopifyConfig(config)

  newConfig.optimization = {}

  newConfig.output.chunkFilename = '[name].[hash].js'

  newConfig.output.publicPath = ''

  return newConfig
}
