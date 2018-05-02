const compiler = require('../..')

const mode = 'debug'
console.log(`Compiling in ${mode} mode...`)

compiler(mode)
  .then(() => console.log(`All done!!`))
  .catch(e => console.log(e))
