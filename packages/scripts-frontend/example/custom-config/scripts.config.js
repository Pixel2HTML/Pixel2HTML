const path = require('path')

module.exports = (config, webpack) => {
  config.entry.main = path.join(__dirname, 'js/index.js')
  return config
}
