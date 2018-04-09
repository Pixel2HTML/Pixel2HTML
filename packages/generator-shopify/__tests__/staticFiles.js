import helpers from 'yeoman-test'
import assert from 'yeoman-assert'
import path from 'path'
import { staticFiles } from '../src/app/lib/filesToAssert'
import {
  shopName,
  shopKey,
  shopPassword,
  shopSecret,
  shopThemeId
} from '../src/app/lib/mockPrompts'

describe('Static Files', function () {
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

  it('creates expected static files', function () {
    const compiledFiles = staticFiles.map(file => `src/${file}`)
    assert.file(compiledFiles)
  })
})
