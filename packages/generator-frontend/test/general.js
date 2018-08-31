import helpers from 'yeoman-test'
import assert from 'yeoman-assert'
import path from 'path'
import {
  baseFiles,
  baseTemplates,
  gulpFiles,
  gulpTemplates
} from '../app/filesToAssert'

describe('General Assertions', function () {
  beforeEach(function () {
    return helpers.run(path.join(__dirname, '../app'))
      .withOptions({
        'skip-install': true
      })
      .withPrompts({
        projectName: 'Pixel2HTML',
        qtyScreens: 6,
        markupLanguage: 'html'
      })
      .toPromise()
  })

  it('creates expected base files', function () {
    assert.file([
      ...baseFiles,
      ...baseTemplates,
      ...gulpFiles,
      ...gulpTemplates,
      'package.json',
      '.gitignore',
      '.gitattributes',
      '.tern-project',
      '.editorconfig',
      'src/index.html',
      'src/screen-2.html',
      'src/screen-3.html',
      'src/screen-4.html',
      'src/screen-5.html',
      'src/screen-6.html',
      'src/assets/head/favico.ico',
      'src/assets/head/favicon.png',
      'src/assets/head/manifest.json'
    ])
  })

  it('should have the project name on package.json', function () {
    assert.fileContent('package.json', /"name": "Pixel2HTML"/)
  })
})
