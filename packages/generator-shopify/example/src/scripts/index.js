// EXAMPLE DELETE EVERYTHING BELOW
// Learn more about ES6 Here:
// http://wesbos.com/javascript-modules/
// https://babeljs.io/learn-es2015/

const colors = ['pink', 'red', 'blue']
const moColors = ['blue', 'orange']

// We have Es6 Goodies thanks to Babel
const allTheColors = [...colors, ...moColors]
allTheColors.map(c => console.log(c))