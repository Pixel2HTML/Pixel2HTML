// This is for us to do code-split see example below...
import './public-path'

// EXAMPLE DELETE EVERYTHING BELOW
// Learn more about ES6 Here:
// http://wesbos.com/javascript-modules/
// https://babeljs.io/learn-es2015/

const colors = [ 'pink', 'red', 'blue' ]
const moColors = ['blue', 'orange']

// We have Es6 Goodies thanks to Babel
const allTheColors = [ ...colors, ...moColors ]
allTheColors.map(c => console.log(c))

// This is an async module
const button = document.querySelector('.async-button')

// https://webpack.js.org/guides/code-splitting/
button.addEventListener('click', e => {
  import('./async-button')
    .then(asyncButton => asyncButton.default(button))
})
