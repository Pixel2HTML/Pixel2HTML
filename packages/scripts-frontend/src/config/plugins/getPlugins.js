import commonPlugins from './common'
import debugPlugins from './debug'
import developmentPlugins from './development'
import productionPlugins from './production'
import { shouldBeDebugMode, isDebug } from '../tools/checkEnv'

const getPlugins = () => {
  let plugins = [ ...commonPlugins ]

  if (!shouldBeDebugMode()) plugins = [...plugins, ...developmentPlugins]
  if (shouldBeDebugMode()) plugins = [...plugins, ...productionPlugins]
  if (isDebug()) plugins = [...plugins, ...debugPlugins]

  return plugins
}

export default getPlugins
