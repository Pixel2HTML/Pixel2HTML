const fs = require('fs-extra')
const { SRC, DIST } = require('./directories')

fs.copy(SRC, DIST)
  .then(() => {
    console.log('Success')
  })
  .catch(err => {
    console.error(err)
  })
