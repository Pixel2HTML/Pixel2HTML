import helpers from 'yeoman-test'
import assert from 'yeoman-assert'
import path from 'path'

describe('Foundation features', function () {
  beforeEach(function () {
    return helpers.run(path.join(__dirname, '../app'))
      .withOptions({
        'skip-install': true
      })
      .withPrompts({
        projectName: 'Pixel2HTML',
        qtyScreens: 3,
        markupLanguage: 'html',
        frontEndFramework: 'foundation'
      })
      .toPromise()
  })

  it('Should exists dependencies in package.json', function () {
    assert.fileContent('package.json', /"foundation-sites"/)
  })

  it('should exists a gulp routine', function () {
    assert.file([
      'gulp/common/styles.js',
      'gulp/common/scripts.js'
    ])
  })
  it('should exists vendor files', function () {
    assert.file([
      'src/assets/styles/vendor/vendor.scss',
      'src/assets/js/index.js'
    ])
  })

  it('should include foundation include', function () {
    assert.fileContent('src/assets/styles/vendor/vendor.scss', /import "foundation-sites\/scss\/foundation";/)
    assert.fileContent('src/assets/js/framework.js', /import 'foundation-sites'/)
  })
})
