import UglifyJSPlugin from 'uglifyjs-webpack-plugin'
import webpack from 'webpack'

const productionPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  // Concatenate modules for smaller builds
  new webpack.optimize.ModuleConcatenationPlugin(),
  // Uglify the heck out of this
  new UglifyJSPlugin({
    sourceMap: true,
    test: /\.(js|liquid)$/
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
]

export default productionPlugins
