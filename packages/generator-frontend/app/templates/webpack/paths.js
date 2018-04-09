const {cwd} = require('process')
const {join} = require('path')
const config = require('../gulp/config')

const c = cwd()

module.exports = {
  src: join(c, config.directories.src.base),
  entry: join(c, config.project.jsMainFile),
  output: join(c, config.directories.dist.scripts),
  styles: join(c, config.directories.src.cssModules)
}
