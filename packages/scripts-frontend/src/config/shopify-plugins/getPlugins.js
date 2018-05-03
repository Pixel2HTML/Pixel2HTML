import commonPlugins from './common'
import debugPlugins from '../plugins/debug'
import productionPlugins from './production'
import { checkDebug, isDebug } from '../tools/checkEnv'

const getPlugins = () => {
  const shouldBeDebugMode = checkDebug()

  let plugins = [...commonPlugins]

  if (shouldBeDebugMode) plugins = [...plugins, ...productionPlugins]
  if (isDebug()) plugins = [...plugins, ...debugPlugins]

  return plugins
}

export default getPlugins
