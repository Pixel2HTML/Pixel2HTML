import webpack from 'webpack'
import banner from './banner'

const common = [
  // Do NOT import the BLOAT from moment.js
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  // People please don't edit the dist file pl0xx
  new webpack.BannerPlugin(banner)
]

export default common
