export const setEnv = mode => {
  process.env.NODE_ENV = mode
  process.env.BABEL_ENV = mode
}

export const setDebug = mode => {
  process.env.DEBUG_MODE = mode
}

export default setEnv
