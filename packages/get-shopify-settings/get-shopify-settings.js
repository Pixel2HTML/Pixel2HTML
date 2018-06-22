const Shopify = require('shopify-api-node')
const dotenv = require('dotenv')

dotenv.config()

const { env } = require('process')

const apiKey = env.SHOP_KEY
const password = env.SHOP_PASSWORD
const shopName = env.SHOP_NAME

const shopify = new Shopify({
  shopName, apiKey, password
})

const getSettings = async () => {
  const themes = await shopify.theme.list()
  const currentTheme = themes.find(theme => theme.role === 'main')
  const id = currentTheme.id

  const rawSettings = await shopify.asset.get(id, {
    'asset[key]': 'config/settings_data.json'
  })

  const settings = JSON.parse(rawSettings.value)

  const data = JSON.stringify(settings, null, 2)
  const fs = require('fs')
  fs.writeFileSync('settings_data.json', data)
}

getSettings()
