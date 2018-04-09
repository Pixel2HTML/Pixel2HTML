import helpers from 'yeoman-test'
import assert from 'yeoman-assert'
import path from 'path'
import { gulpFiles } from '../src/app/lib/filesToAssert'
import {
  shopName,
  shopKey,
  shopPassword,
  shopSecret,
  shopThemeId
} from '../src/app/lib/mockPrompts'

describe('Gulp Files', function () {
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

  it('creates expected gulp files', function () {
    const allFiles = gulpFiles.map(file => `gulp/${file}`)
    assert.file(allFiles)
  })
})
