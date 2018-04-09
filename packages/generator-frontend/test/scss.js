import helpers from 'yeoman-test'
import assert from 'yeoman-assert'
import path from 'path'

import { scss, templateScss } from '../app/filesToAssert'

describe('SCSS features', function () {
  beforeEach(function () {
    return helpers.run(path.join(__dirname, '../app'))
      .withOptions({
        'skip-install': true
      })
      .withPrompts({
        projectName: 'Pixel2HTML',
        qtyScreens: 3,
        markupLanguage: 'html'
      })
      .toPromise()
  })

  it('should exists base SCSS file', function () {
    const styles = [...scss, ...templateScss].map(file => `src/assets/${file}`)
    assert.file(styles)
  })

  it('should exists screens SCSS files', function () {
    assert.file([
      'src/assets/styles/main/screens/_screen_1.scss',
      'src/assets/styles/main/screens/_screen_2.scss',
      'src/assets/styles/main/screens/_screen_3.scss'
    ])
  })

  it('should have project and client ids on comments', function () {
    assert.fileContent('src/assets/styles/main/screens/_screen_1.scss', /Pixel2HTML/)
    assert.fileContent('src/assets/styles/main/screens/_screen_2.scss', /Pixel2HTML/)
    assert.fileContent('src/assets/styles/main/screens/_screen_3.scss', /Pixel2HTML/)
  })

  it('should have screen number on comments', function () {
    assert.fileContent('src/assets/styles/main/screens/_screen_1.scss', /Screen 1/)
    assert.fileContent('src/assets/styles/main/screens/_screen_2.scss', /Screen 2/)
    assert.fileContent('src/assets/styles/main/screens/_screen_3.scss', /Screen 3/)
  })

  it('should exists a gulp routine', function () {
    assert.file([
      'gulp/common/styles.js',
      'gulp/common/cssModulesWrite.js',
      'gulp/production/minifyStyles.js',
      'gulp/production/purify.js',
      'gulp/production/styles-production.js'
    ])
  })

  it('should exists a pipe in the main:styles routing', function () {
    assert.fileContent('gulp/common/styles.js', /styles/)
  })
})
