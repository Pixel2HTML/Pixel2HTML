const webpack = require('webpack')

let common = [
  // Allow everyone to use jQuery like it was global
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    // Popper is for Bootstrap 4 mainly
    Popper: ['popper.js', 'default']
  }),
  // Do NOT import the BLOAT from moment.js
  // thanks create-react-app
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new webpack.BannerPlugin({
    banner: `
/*!********************************************************************
*  ##      ##    ###    ########  ##    ## #### ##    ##  ######   ####
*  ##  ##  ##   ## ##   ##     ## ###   ##  ##  ###   ## ##    ##  ####
*  ##  ##  ##  ##   ##  ##     ## ####  ##  ##  ####  ## ##        ####
*  ##  ##  ## ##     ## ########  ## ## ##  ##  ## ## ## ##   ####  ##
*  ##  ##  ## ######### ##   ##   ##  ####  ##  ##  #### ##    ##
*  ##  ##  ## ##     ## ##    ##  ##   ###  ##  ##   ### ##    ##  ####
*  ###  ###  ##     ## ##     ## ##    ## #### ##    ##  ######   ####
*
*  Don't edit this file directly. Edit with Webpack.
*  Then after you're done run npm run build
*
*  Scaffolded with @pixel2html/generator-frontend
*
*  https://github.com/Pixel2HTML/pixel2html-generator
*  ********************************************************************/
`,
    raw: true
  })
]

module.exports = common
