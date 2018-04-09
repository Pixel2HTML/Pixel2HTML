import lazypipe from 'lazypipe'
import {default as name} from 'gulp-rename'
import csscomb from 'gulp-csscomb'
import groupCssMediaQueries from 'gulp-group-css-media-queries'
import cssnano from 'gulp-cssnano'

const minifyStyles = (rename) => {
  const renameDefaults = {suffix: '.min'}
  const renameConfig = Object.assign({}, renameDefaults, rename)
  return lazypipe()
    .pipe(name, renameConfig)
    .pipe(csscomb)
    .pipe(groupCssMediaQueries)
    .pipe(cssnano)
}

export default minifyStyles
