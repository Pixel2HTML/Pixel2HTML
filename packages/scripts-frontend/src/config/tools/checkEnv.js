import { env } from 'process'

const { NODE_ENV } = env

export const checkEnv = mode => NODE_ENV === mode

export const isProd = () => checkEnv('production')
export const isDebug = () => checkEnv('debug')

export const checkDebug = () =>
  isProd() || isDebug()
