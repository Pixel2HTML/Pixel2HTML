const gulp = require('gulp')
const config = require('../gulp.config')
const $ = require('gulp-load-plugins')()

const createShopifyTask = name => {
  gulp.task(`shopify:${name}`, () =>
    gulp.src(config.src.theme + `/${name}/**/*`)
      .pipe($.changedInPlace({firstPass: true}))
      .pipe(gulp.dest(config.theme + `/${name}`))
  )
}

const flattenShopifyTask = name => {
  gulp.task(`shopify:${name}`, () =>
    gulp.src(config.src.theme + `/${name}/**/*`)
      .pipe($.changedInPlace({firstPass: true}))
      .pipe($.flatten())
      .pipe(gulp.dest(config.theme + `/${name}`))
  )
}

config.shopify.flatFolders.forEach(createShopifyTask)
config.shopify.multiLevelFolders.forEach(flattenShopifyTask)

const allFolders = [
  ...config.shopify.flatFolders,
  ...config.shopify.multiLevelFolders
]

const shopifyTaskNames = allFolders.map(folder => `shopify:${folder}`)

gulp.task('shopify', gulp.parallel(...shopifyTaskNames))
