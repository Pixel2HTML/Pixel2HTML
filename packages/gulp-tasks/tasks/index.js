const config = require('./config')
const gulp = require('gulp')
const prod = config.production
const createWatcher = require('./development/watch')

const pixel2htmlGulpTasks = options => {
  const taskOverrides = options && options.taskOverrides
    ? options.taskOverrides : () => {}
  const watchExtensions = options && options.watchExtensions
    ? options.watchExtensions : () => {}

  const common = [
    'fonts', 'markup',
    'scripts', 'static',
    'styles'
  ]
  const development = [
    'serve'
  ]
  const production = [
    'minifyStyles',
    'purify',
    'zip'
  ]

  common.forEach(file => require(`./common/${file}`))
  production.forEach(file => require(`./production/${file}`))
  development.forEach(file => require(`./development/${file}`))

  let tasks = [
    'clean',
    'styles',
    'images',
    'head',
    'scripts',
    'fonts',
    'markup',
  ]

  const prodTasks = [
    'minifyStyles',
    'purify',
    'zip',
  ]

  if (prod) tasks = [...tasks, ...prodTasks]

  // Do CSS with your gulp tasks (last wins)
  taskOverrides()
  // Add more watchers to the watchers lol
  createWatcher(watchExtensions)

  gulp.task('build', gulp.series(...tasks))

  let adminTasks = [
    'serve',
    'browser-sync',
    'watch',
    'build',
    'serve',
    'release',
    'zip'
  ]

  gulp.task('release', gulp.series('build', 'zip'))
  gulp.task('serve', gulp.parallel('browser-sync', 'watch'))
  gulp.task('default', gulp.series('build', 'serve'))

  return {
    tasks,
    adminTasks
  }
}

module.exports = pixel2htmlGulpTasks
