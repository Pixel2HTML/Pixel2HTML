import UglifyJSPlugin from 'uglifyjs-webpack-plugin'

const productionPlugins = [
  new UglifyJSPlugin({sourceMap: true}),
]

export default productionPlugins
