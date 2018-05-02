const gulp = require('gulp')
const compilator = require('@pixel2html/scripts-frontend')

gulp.task('start', async done => {
  try {
    await compilator('development')
    done()
  } catch (e) {
    console.log(e)
    done()
  }
})

gulp.task('build', async done => {
  try {
    await compilator('production')
    done()
  } catch (e) {
    console.log(e)
    done()
  }
})

gulp.task('debug', async done => {
  try {
    await compilator('debug')
    done()
  } catch (e) {
    console.log(e)
    done()
  }
})
