const setEnv = mode => {
  process.env.NODE_ENV = mode
  process.env.BABEL_ENV = mode
}

export default setEnv
