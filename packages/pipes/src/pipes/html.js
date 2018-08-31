import lazypipe from 'lazypipe'
import modules from 'posthtml-css-modules'
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
  ]
  const postHtmlPlugins = [...defaultPlugins, ...plugins]
  return lazypipe()
    .pipe(replace, htmlReplace)
    .pipe(postHtml, postHtmlPlugins)
    .pipe(prettify)
}

export default html
