const app = () => {
  const colors = ['pink', 'yellow', 'blue']
  const moreColors = ['red', 'orange', 'aqua']

  const allTheColors = [...colors, ...moreColors]

  allTheColors.map(console.log)
}

export default app
