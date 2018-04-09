const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const config = require('./gulp/gulp.config')
const {cwd, env} = require('process')

const production = config.production
const debug = config.debug
const WebpackMonitor = require('webpack-monitor')

// When you really want to make the relationship work...
const ENTRY_PATH = cwd() + '/' + config.src.scripts
const OUTPUT_PATH = cwd() + '/' + config.theme + '/assets'

let plugins = [
  // Add the env to remove excess skin
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(env.NODE_ENV)
    }
  }),
  new webpack.SourceMapDevToolPlugin({
    filename: '[name].js.map',
    append: '\n//# sourceMappingURL={{ "[url]" | asset_url }}',
    test: /\.(js|liquid)$/
  }),
  // Add module names to factory functions so they appear in browser profiler.
  new webpack.NamedModulesPlugin(),
  // Allow everyone to use jQuery like it was global
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery'
  }),
  // Separate node_modules packages
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: module => /node_modules/.test(module.resource)
  }),
  // Do NOT import the BLOAT from moment.js
  // thanks create-react-app
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
]

const productionPlugins = [
  // Concatenate modules for smaller builds
  new webpack.optimize.ModuleConcatenationPlugin(),
  // Uglify the heck out of this
  new UglifyJSPlugin({
    sourceMap: true,
    test: /\.(js|liquid)$/
  })
]

const debugPlugins = [
  new BundleAnalyzerPlugin(),
  new WebpackMonitor({
    target: cwd() + '/gulp/stats.json',
    launch: true,
    port: 5000
  })
]

if (production) plugins = [...plugins, ...productionPlugins]
if (debug) plugins = [...plugins, ...debugPlugins]

const CONFIG = {
  entry: ENTRY_PATH,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: {
          loader: 'eslint-loader'
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              require.resolve('@pixel2html/babel-preset')
            ],
            cacheDirectory: true
          }
        }
      }
    ]
  },
  output: {
    filename: debug ? '[name].js' : '[name].js.liquid',
    path: OUTPUT_PATH
  },
  plugins,
  externals: {
    jquery: 'jQuery'
  },
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

module.exports = CONFIG
