import { cwd } from 'process'
import { join } from 'path'

const makePath = filePath => join(cwd(), filePath)

// Opinionated life lol
const src = makePath('src')
const entry = makePath('src/assets/js/index.js')
const styles = makePath('src/assets/cssModules/css.json')
const output = makePath('dist/assets/js')

const userConfig = makePath('webpack.config.js')

export {
  src,
  entry,
  styles,
  output,
  userConfig
}
