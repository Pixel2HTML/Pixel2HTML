export const checkEnv = mode => process.env.NODE_ENV === mode

export const isProd = () => checkEnv('production')
export const isDebug = () => checkEnv('debug')

export const checkDebug = () =>
  isProd() || isDebug()
