import lazypipe from 'lazypipe'
import moduleImporter from 'sass-module-importer'
import sass from 'gulp-sass'
import postCss from 'gulp-postcss'
import concat from 'gulp-concat'
import sourcemaps from 'gulp-sourcemaps'

import autoprefixer from 'autoprefixer'
import postCssModules from 'postcss-modules'
import browsers from '@pixel2html/browserlist'
import path from 'path'
import set from 'lodash.set'

const cssModules = {}

const styles = ({
  name = 'main.css',
  modules = false,
  production = false,
  postCssPlugins = []
}) => {
  const basePlugins = [autoprefixer({ browsers })]

  if (modules) {
    basePlugins.push(
      postCssModules({
        generateScopedName: production ? '[hash:base64:5]' : '[name]__[local]___[hash:base64:5]',
        getJSON: (cssPath, json) => {
          const pathWithoutExtension = cssPath.split('.css')[0]
          const exploded = pathWithoutExtension.split(path.sep)
          const mainIndex = exploded.indexOf('main')
          const dirs = exploded.slice(mainIndex + 1)
          set(cssModules, dirs, json)
        }
      })
    )
  }

  const postCssPlugs = [...basePlugins, ...postCssPlugins]

  const baseStyles = lazypipe()
    .pipe(sass, { importer: moduleImporter() })
    .pipe(postCss, postCssPlugs)
    .pipe(concat, name)

  const sourcemapStyles = lazypipe()
    .pipe(sourcemaps.init)
    .pipe(baseStyles)
    .pipe(sourcemaps.write, '.')

  return production ? baseStyles : sourcemapStyles
}

export const getJSON = () => JSON.stringify(cssModules, null, 2)
export default styles
