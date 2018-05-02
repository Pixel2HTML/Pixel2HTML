import { entry, output, styles } from './paths'
import getPlugins from './plugins/getPlugins'
import { checkDebug } from './tools/checkEnv'
import modules from './modules'

const shouldBeDebugMode = checkDebug()

const config = {
  entry: {
    main: entry
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: output,
    publicPath: '/'
  },
  // Check corresponding file for more info xoxoxo
  module: modules,
  plugins: getPlugins(),
  devtool: shouldBeDebugMode ? 'source-map' : 'inline-source-map',
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  resolve: {
    alias: {
      styles: styles
    }
  },
  bail: shouldBeDebugMode,
  mode: shouldBeDebugMode ? 'production' : 'development',
  performance: {
    hints: shouldBeDebugMode ? 'warning' : false
  },
}

export default config
