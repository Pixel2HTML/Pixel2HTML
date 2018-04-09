import lazypipe from 'lazypipe'
import {default as modules} from 'posthtml-css-modules'
import {default as img} from 'posthtml-img-autosize'
import postHtml from 'gulp-posthtml'
import prettify from 'gulp-html-prettify'
import replace from 'gulp-html-replace'

const html = ({
  cssModules,
  imgAutoSize,
  htmlReplace,
  plugins = []
}) => {
  const defaultPlugins = [
    modules(cssModules),
    img(imgAutoSize)
  ]
  const postHtmlPlugins = [...defaultPlugins, ...plugins]
  return lazypipe()
    .pipe(replace, htmlReplace)
    .pipe(postHtml, postHtmlPlugins)
    .pipe(prettify)
}

export default html
