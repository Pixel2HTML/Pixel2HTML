export const checkEnv = mode => process.env.NODE_ENV === mode

export const isProd = () => process.env.NODE_ENV === 'production'
export const isDebug = () => process.env.DEBUG_MODE === 'true'

export const checkDebug = () =>
  isProd() || isDebug()
