import helpers from 'yeoman-test'
import assert from 'yeoman-assert'
import path from 'path'
import { dotfiles } from '../src/app/lib/filesToAssert'
import {
  shopName,
  shopKey,
  shopPassword,
  shopSecret,
  shopThemeId
} from '../src/app/lib/mockPrompts'

describe('Base Files', function () {
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

  it('creates expected base files', function () {
    const transformedFiles = dotfiles.map(file => `.${file}`)
    assert.file(transformedFiles)
  })

  it('Writes our options where we need them', function () {
    assert.fileContent('.env', shopName)
    assert.fileContent('.env', shopKey)
    assert.fileContent('.env', shopPassword)
    assert.fileContent('.env', shopSecret)
    assert.fileContent('.env', shopThemeId)
  })
})
