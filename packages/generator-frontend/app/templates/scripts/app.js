// Welcome to our main file!
// we are using Webpack and ES6
// feel free to use imports and exports
// as well as ES6 code

// Try to make your whole code work via exporting
// a single function to get Hot Module Replacement
// just like app.init()
// from the good ol'days

const colors = [ 'pink', 'red', 'blue' ]
const moColors = ['yellow', 'papayawhip']

const allTheColors = [ ...colors, ...moColors ]
allTheColors.map(color => console.log(`The color is ${color}`))

// Happy coding from Pixel2HTML
