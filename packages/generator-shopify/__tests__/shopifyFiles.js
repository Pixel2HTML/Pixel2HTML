import helpers from 'yeoman-test'
import assert from 'yeoman-assert'
import path from 'path'
import { shopifyCoreFiles } from '../src/app/lib/filesToAssert'
import {
  shopName,
  shopKey,
  shopPassword,
  shopSecret,
  shopThemeId
} from '../src/app/lib/mockPrompts'

describe('General Assertions', function () {
  beforeEach(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({
        noAnims: true
      })
      .withPrompts({
        projectName: 'Awesome Test Project',
        setShopNow: true,
        shopName,
        shopKey,
        shopPassword,
        shopSecret,
        shopThemeId
      })
      .toPromise()
  })

  it('creates expected general files', function () {
    const shopifyFiles = shopifyCoreFiles.map(file => `src/theme/${file}`)
    assert.file(shopifyFiles)
  })

  it('writes what we need in the shopify files', function () {
    assert.fileContent('src/theme/layout/theme.liquid', 'Awesome Test Project')
    assert.fileContent('src/theme/layout/checkout.liquid', 'Awesome Test Project')
    assert.fileContent('src/theme/config/settings_schema.json', 'Awesome Test Project')
  })
})
