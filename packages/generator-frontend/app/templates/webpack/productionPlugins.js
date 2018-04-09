const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const productionPlugins = [
  new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new UglifyJSPlugin({sourceMap: true})
]

module.exports = productionPlugins
