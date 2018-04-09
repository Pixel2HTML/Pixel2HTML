import lazypipe from 'lazypipe'
import {default as compiler} from 'gulp-pug'
import {default as modules} from 'posthtml-css-modules'
import {default as img} from 'posthtml-img-autosize'
import postHtml from 'gulp-posthtml'
import prettify from 'gulp-html-prettify'

const pug = ({
  cssModules,
  imgAutoSize,
  pug,
  plugins = []
}) => {
  const defaultPlugins = [
    modules(cssModules),
    img(imgAutoSize)
  ]

  const postHtmlPlugins = [...defaultPlugins, ...plugins]
  return lazypipe()
    .pipe(compiler, pug)
    .pipe(postHtml, postHtmlPlugins)
    .pipe(prettify)
}

export default pug
