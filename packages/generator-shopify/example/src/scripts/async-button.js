const asyncButton = button => {
  // Change background color
  const html = document.documentElement
  html.style.backgroundColor = '#31a8fa'

  // Brag about it
  const h4 = document.createElement('h4')
  h4.textContent = 'This was added async!'
  button.parentNode.appendChild(h4)
  console.log(`You have been removed from another chunk async!`)

  // Remove button after we're done
  button.parentNode.removeChild(button)
}

export default asyncButton
