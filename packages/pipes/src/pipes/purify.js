import lazypipe from 'lazypipe'
import purifyCss from 'gulp-purifycss'

const purify = ({ paths, userConfig }) => {
  const defaultConfig = { info: true }
  const config = Object.assign({}, defaultConfig, userConfig)
  return lazypipe()
    .pipe(purifyCss, paths, config)
}

export default purify
