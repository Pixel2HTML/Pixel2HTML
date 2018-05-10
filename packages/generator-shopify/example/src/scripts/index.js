import './publicPath'

const button = document.querySelector('.async-btn')

button.addEventListener('click', event => {
  import(/* webpackChunkName: 'button' */'./button.js')
    .then(button => button.default())
})
