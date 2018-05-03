import banner from '../plugins/banner'
import webpack from 'webpack'

const commonPlugins = [
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
  // Do NOT import the BLOAT from moment.js
  // thanks create-react-app
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  // Warning banner
  new webpack.BannerPlugin(banner)
]

export default commonPlugins
