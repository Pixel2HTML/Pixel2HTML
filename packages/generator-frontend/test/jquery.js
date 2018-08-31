import helpers from 'yeoman-test'
import assert from 'yeoman-assert'
import path from 'path'

describe('jQuery features', function () {
  beforeEach(function () {
    return helpers.run(path.join(__dirname, '../app'))
      .withOptions({
        'skip-install': true
      })
      .withPrompts({
        projectName: 'Pixel2HTML',
        qtyScreens: 3,
        markupLanguage: 'html',
        frontEndFramework: 'bootstrap-4',
        jQuery: true
      })
      .toPromise()
  })

  it('should exists a gulp routine', function () {
    assert.file([
      'gulp/common/scripts.js'
    ])
  })
})
