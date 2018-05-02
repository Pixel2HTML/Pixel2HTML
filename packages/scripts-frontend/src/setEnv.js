import { env } from 'process'

const setEnv = mode => {
  env.NODE_ENV = mode
  env.BABEL_ENV = mode
}

export default setEnv
