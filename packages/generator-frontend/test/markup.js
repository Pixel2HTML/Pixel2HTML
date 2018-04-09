import helpers from 'yeoman-test'
import assert from 'yeoman-assert'
import path from 'path'

describe('Markup Features', function () {
  describe('HTML Project', function () {
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
        '.gitignore',
        '.gitattributes',
        'package.json',
        'gulpfile.js',
        'package.json',
        '.editorconfig',
        'src/index.html',
        'src/screen-2.html',
        'src/screen-3.html',
        'src/screen-4.html',
        'src/screen-5.html',
        'src/screen-6.html'
      ])
    })

    it('should have the project name on package.json', function () {
      assert.fileContent('package.json', /"name": "Pixel2HTML"/)
    })

    it('should exists a gulp routine', function () {
      assert.file(['gulp/common/markup.js'])
    })

    it('should have the gulp routine in gulp default\'s task', function () {
      assert.fileContent('gulpfile.js', /'markup'/)
      assert.fileContent('gulpfile.js', /'icons'/)
      assert.noFileContent('gulpfile.js', /'jekyll'/)
    })

    it('should have the projectName in the title tag', function () {
      assert.fileContent('src/index.html', /<title>Pixel2HTML - Screen 1<\/title>/)
    })
  })

  describe('PUG Project', function () {
    beforeEach('crafting  project', function () {
      return helpers.run(path.join(__dirname, '../app'))
        .withOptions({
          'skip-install': true
        })
        .withPrompts({
          projectName: 'Pixel2HTML',
          qtyScreens: 6,
          markupLanguage: 'pug'
        })
        .toPromise()
    })

    it('creates expected base files', function () {
      assert.file([
        '.gitignore',
        '.gitattributes',
        'package.json',
        'gulpfile.js',
        'package.json',
        '.editorconfig',
        'src/pug/index.pug',
        'src/pug/screen-2.pug',
        'src/pug/screen-3.pug',
        'src/pug/screen-4.pug',
        'src/pug/screen-5.pug',
        'src/pug/screen-6.pug',
        'src/pug/layouts/layout-primary.pug',
        'src/pug/layouts/general/footer.pug',
        'src/pug/layouts/general/menu.pug',
        'src/pug/layouts/includes/mixins.pug',
        'gulp',
        'src/assets/fonts',
        'src/assets/icons',
        'src/assets/images',
        'src/assets/js',
        'src/assets/styles'
      ])
    })

    it('should have the project name on package.json', function () {
      assert.fileContent('package.json', /"name": "Pixel2HTML"/)
    })

    it('should exists a gulp routine', function () {
      assert.file([
        'gulp/common/markup.js'
      ])
      assert.fileContent('gulp/common/markup.js', /pug/)
    })

    it('should exists a pipe in the main:markup', function () {
      assert.fileContent('gulp/common/markup.js', /pug\(/)
    })

    it('should have the gulp routine in gulp default\'s task', function () {
      assert.fileContent('gulpfile.js', /'markup'/)
      assert.noFileContent('gulpfile.js', /'jekyll'/)
      assert.noFileContent('gulpfile.js', /'icons'/)
    })
  })
})
