import lazypipe from 'lazypipe'
import compiler from 'gulp-pug'
import modules from 'posthtml-css-modules'
import postHtml from 'gulp-posthtml'
import prettify from 'gulp-jsbeautifier'

const pug = ({
  cssModules,
  pug,
  plugins = []
}) => {
  const defaultPlugins = [
    modules(cssModules),
  ]

  const postHtmlPlugins = [...defaultPlugins, ...plugins]
  return lazypipe()
    .pipe(compiler, pug)
    .pipe(postHtml, postHtmlPlugins)
    .pipe(prettify)
}

export default pug
