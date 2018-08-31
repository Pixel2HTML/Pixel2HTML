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
  new UglifyJSPlugin({ sourceMap: true }),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
]

export default productionPlugins
