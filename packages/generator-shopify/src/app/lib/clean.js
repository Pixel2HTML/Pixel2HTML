const fs = require('fs-extra')
const { DIST } = require('./directories')

fs.remove(DIST)
  .then(() => {
    console.log('Success')
  })
  .catch(err => {
    console.error(err)
  })
