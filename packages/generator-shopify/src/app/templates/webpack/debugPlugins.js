const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const debugPlugins = [
  new BundleAnalyzerPlugin()
]

module.exports = debugPlugins
