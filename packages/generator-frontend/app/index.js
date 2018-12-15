const Generator = require('yeoman-generator')
const chalk = require('chalk')
const mkdirp = require('mkdirp')
const fs = require('fs-extra')
const updateNotifier = require('update-notifier')
const pkg = require('../package.json')

const filter = require('gulp-filter')
const prettify = require('gulp-jsbeautifier')
const eslint = require('gulp-eslint')

const filesToAssert = require('./filesToAssert')

class PixelGenerator extends Generator {
  constructor (args, options) {
    super(args, options)
    this.paths = {
      src: {
        gulp: 'gulp',
        gulp_tasks: 'gulp/tasks',
        fonts: 'src/assets/fonts',
        icons: 'src/assets/icons',
        images: 'src/assets/images',
        scripts: 'src/assets/js',
        styles: 'src/assets/styles',
        head: 'src/assets/head',
        markup: 'src',
        base: 'src'
      },
      dist: {
        assets: 'dist/assets',
        fonts: 'dist/assets/fonts',
        icons: 'dist/assets/icons',
        images: 'dist/assets/images',
        scripts: 'dist/assets/js',
        styles: 'dist/assets/css',
        base: 'dist',
        markup: 'dist'
      },
      releases: {
        base: 'dist/releases'
      }
    }

    this.option('projectName', {
      desc: 'Sets the Project Name',
      type: String,
      required: false
    })

    this.option('qtyScreens', {
      desc: 'Sets the quantity of screens have the project i.e. 5 (1 homepage, 4 inners)',
      type: Number,
      required: false
    })

    this.option('markupLanguage', {
      desc: 'Sets the Markup Language [html, pug]',
      type: String,
      required: false
    })

    this.option('frontEndFramework', {
      desc: 'Sets the framework of choice [bootstrap, foundation]',
      type: String,
      required: false
    })

    this.option('jQuery', {
      desc: 'Sets the usage of jQuery',
      type: String,
      required: false
    })
  }

  notify () {
    updateNotifier({ pkg }).notify()
  }

  readConfigFile () {
    return fs.readJson('./.project.conf')
      .then(config => {
        this.options.projectName = config.projectName
        this.options.qtyScreens = config.qtyScreens
        this.options.markupLanguage = config.markupLanguage
        this.options.frontEndFramework = config.frontEndFramework
        this.options.jQuery = config.jQuery
      })
      .catch(err => {
        let okayError = err.toString() !== "Error: ENOENT: no such file or directory, open './.project.conf'"
        if (okayError) {
          this.log(chalk.cyan('There was an issue:') + '\n')
          this.log(chalk.white(err) + '\n')
        }
      })
  }

  welcome () {
    this.log('')
    this.log(chalk.cyan(' ****************************************************'))
    this.log(chalk.cyan('  Welcome to'), chalk.white.bold(' Pixel2HTML Generator '))
    this.log(chalk.white('  A Yeoman generator for scaffolding web projects'))
    this.log(chalk.cyan('  Version'), chalk.white.bold(` ${pkg.version}`))
    this.log(chalk.cyan(' ****************************************************'))
  }

  async askStuff () {
    const props = await this.prompt([
      {
        type: 'input',
        name: 'projectName',
        required: true,
        message: 'Give me the Project Name!'
      },
      {
        type: 'input',
        name: 'qtyScreens',
        message: 'How many screens do you need to code?',
        default: 1
      },
      {
        type: 'list',
        name: 'markupLanguage',
        message: 'What markup lenguage/integration would you like to use? Pick one',
        choices: [
          {
            name: 'HTML',
            value: 'html'
          },
          {
            name: 'pug/jade',
            value: 'pug'
          }
        ]
      },
      {
        type: 'list',
        name: 'frontEndFramework',
        message: 'What FrontEnd Framework do you like to include?',
        choices: [
          {
            name: 'None',
            value: false
          }, {
            name: 'Bootstrap 3',
            value: 'bootstrap-3'
          }, {
            name: 'Bootstrap 4',
            value: 'bootstrap-4'
          }, {
            name: 'Foundation',
            value: 'foundation'
          }]
      },
      {
        type: 'confirm',
        name: 'jQuery',
        message: 'Would you like to use jQuery?'
      },
    ])

    this.options.projectName = props.projectName
    this.options.qtyScreens = parseInt(props.qtyScreens)
    this.options.markupLanguage = props.markupLanguage
    this.options.frontEndFramework = props.frontEndFramework
    this.options.jQuery = props.jQuery
  }

  writeProjectFiles () {
    this.log(chalk.yellow('Copying baseTemplates'))

    const {
      baseTemplates,
      baseFiles,
      dotfiles,
      dotTemplates,
    } = filesToAssert

    baseFiles.forEach(file => {
      this.fs.copy(
        this.templatePath(`base/${file}`),
        this.destinationPath(file)
      )
    })

    dotfiles.forEach(file => {
      this.fs.copy(
        this.templatePath(`dotfiles/${file}`),
        this.destinationPath(`.${file}`)
      )
    })

    baseTemplates.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(`base/${file}.ejs`),
        this.destinationPath(file), {
          paths: this.paths,
          projectName: this.options.projectName,
          frontEndFramework: this.options.frontEndFramework,
          jQuery: this.options.jQuery,
          qtyScreens: this.options.qtyScreens,
          markupLanguage: this.options.markupLanguage,
          now: new Date(),
          version: pkg.version
        }
      )
    })

    dotTemplates.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(`dotfiles/${file}.ejs`),
        this.destinationPath(`.${file}`), {
          frontEndFramework: this.options.frontEndFramework,
          jQuery: this.options.jQuery
        }
      )
    })
  }

  createFolders () {
    this.log(chalk.yellow('Creating directories.'))

    const srcPaths = Object.keys(this.paths.src)
    srcPaths.forEach(path => mkdirp(this.paths.src[path]))
    const releasesPaths = Object.keys(this.paths.releases)
    releasesPaths.forEach(path => mkdirp(this.paths.releases[path]))
  }

  copyGitKeepFiles () {
    this.fs.copy(
      this.templatePath('dotfiles/gitkeep'),
      this.destinationPath(this.paths.releases.base + '/.gitkeep')
    )
    this.fs.copy(
      this.templatePath('dotfiles/gitkeep'),
      this.destinationPath(this.paths.src.fonts + '/.gitkeep')
    )
    this.fs.copy(
      this.templatePath('dotfiles/gitkeep'),
      this.destinationPath(this.paths.src.icons + '/.gitkeep')
    )
    this.fs.copy(
      this.templatePath('dotfiles/gitkeep'),
      this.destinationPath(this.paths.src.images + '/.gitkeep')
    )
  }

  copySampleSvg () {
    this.fs.copy(
      this.templatePath('assets/icons/react.svg'),
      this.destinationPath(this.paths.src.icons + '/react.svg')
    )
  }

  copyHeadFiles () {
    this.fs.copy(
      this.templatePath('assets/head/favico.ico'),
      this.destinationPath(this.paths.src.head + '/favico.ico')
    )
    this.fs.copy(
      this.templatePath('assets/head/favicon.png'),
      this.destinationPath(this.paths.src.head + '/favicon.png')
    )
    this.fs.copyTpl(
      this.templatePath('assets/head/manifest.json.ejs'),
      this.destinationPath(this.paths.src.head + '/manifest.json'),
      {
        projectName: this.options.projectName
      }
    )
  }

  writeHtmlFiles () {
    if (this.options.markupLanguage === 'html') {
      for (var i = 1; i < this.options.qtyScreens + 1; i++) {
        const filePath = i === 1
          ? '/index.html'
          : '/screen-' + i + '.' + this.options.markupLanguage
        this.fs.copyTpl(
          this.templatePath('markup/_screen.' + this.options.markupLanguage + '.ejs'),
          this.destinationPath(this.paths.src.markup + filePath),
          {
            screenNumber: i,
            projectName: this.options.projectName,
            frontEndFramework: this.options.frontEndFramework,
            jQuery: this.options.jQuery
          }
        )
      }
    }
  }

  writePugFiles () {
    if (this.options.markupLanguage === 'pug') {
      for (var i = 1; i < this.options.qtyScreens + 1; i++) {
        const filePath = i === 1
          ? 'index.pug'
          : ('screen-' + i + '.' + this.options.markupLanguage)
        this.fs.copyTpl(
          this.templatePath('markup/pug/_screen.' + this.options.markupLanguage),
          this.destinationPath(this.paths.src.markup + '/pug/' + filePath),
          {
            screenNumber: i,
            projectName: this.options.projectName,
            clientId: this.options.clientId,
            projectId: this.options.projectId,
            frontEndFramework: this.options.frontEndFramework,
            jQuery: this.options.jQuery
          }
        )
      }
      this.fs.copyTpl(
        this.templatePath('markup/pug/layouts/layout-primary.pug.ejs'),
        this.destinationPath(this.paths.src.markup + '/pug/layouts/layout-primary.pug'),
        {
          screenNumber: i,
          projectName: this.options.projectName,
          frontEndFramework: this.options.frontEndFramework,
          jQuery: this.options.jQuery
        }
      )
      this.fs.copy(
        this.templatePath('markup/pug/layouts/general/**/*'),
        this.destinationPath(this.paths.src.markup + '/pug/layouts/general')
      )
      this.fs.copy(
        this.templatePath('markup/pug/layouts/includes/**/*'),
        this.destinationPath(this.paths.src.markup + '/pug/layouts/includes')
      )
    }
  }

  writeBaseStyles () {
    const styles = filesToAssert.scss

    styles.forEach(file => {
      this.fs.copy(
        this.templatePath(file),
        this.destinationPath(`src/assets/${file}`)
      )
    })

    for (var i = 1; i < this.options.qtyScreens + 1; i++) {
      this.fs.copyTpl(
        this.templatePath('styles/main/screens/_screen.scss'),
        this.destinationPath(this.paths.src.styles + '/main/screens/_screen_' + i + '.scss'), {
          screenNumber: i,
          projectName: this.options.projectName
        }
      )
    }

    const templateScss = filesToAssert.templateScss

    templateScss.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(`${file}.ejs`),
        this.destinationPath(`src/assets/${file}`), {
          screenNumber: i,
          projectName: this.options.projectName,
          qtyScreens: this.options.qtyScreens,
          frontEndFramework: this.options.frontEndFramework
        }
      )
    })
  }

  writeBaseScriptsFiles () {
    this.log(chalk.yellow('Copying js main file.'))
    this.fs.copyTpl(
      this.templatePath('scripts/app.js'),
      this.destinationPath(this.paths.src.scripts + '/app.js'), {
        projectName: this.options.projectName,
        frontEndFramework: this.options.frontEndFramework
      }
    )
    this.fs.copyTpl(
      this.templatePath('scripts/index.js.ejs'),
      this.destinationPath(this.paths.src.scripts + '/index.js'), {
        projectName: this.options.projectName,
        frontEndFramework: this.options.frontEndFramework,
        jQuery: this.options.jQuery
      }
    )

    if (this.options.frontEndFramework) {
      this.fs.copyTpl(
        this.templatePath('scripts/framework.js.ejs'),
        this.destinationPath(this.paths.src.scripts + '/framework.js'), {
          projectName: this.options.projectName,
          frontEndFramework: this.options.frontEndFramework,
          jQuery: this.options.jQuery
        }
      )
    }
  }

  writeBaseGulpFiles () {
    this.log(chalk.yellow('Copying gulpfile.'))
    this.fs.copyTpl(
      this.templatePath('gulp/gulpfile.js.ejs'),
      this.destinationPath('gulpfile.js'), {
        paths: this.paths,
        frontEndFramework: this.options.frontEndFramework,
        jQuery: this.options.jQuery,
        markupLanguage: this.options.markupLanguage
      }
    )

    this.log(chalk.yellow('Copying gulpfile config file.'))
    this.fs.copyTpl(
      this.templatePath('gulp/config.js.ejs'),
      this.destinationPath(this.paths.src.gulp + '/config.js'), {
        paths: this.paths,
        markupLanguage: this.options.markupLanguage,
        frontEndFramework: this.options.frontEndFramework,
        jQuery: this.options.jQuery
      }
    )

    const tasks = [
      'common/cssModulesWrite',
      'common/fonts',
      'common/scripts',
      'common/styles',
      'development/serve',
      'production/minifyStyles',
      'production/purify',
      'production/styles-production',
      'production/zip'
    ]

    const templateTasks = [
      'common/markup',
      'common/static',
      'development/watch'
    ]

    tasks.forEach(file =>
      this.fs.copy(
        this.templatePath(`gulp/${file}.js`),
        this.destinationPath(`gulp/${file}.js`)
      )
    )

    templateTasks.forEach(file =>
      this.fs.copyTpl(
        this.templatePath(`gulp/${file}.js.ejs`),
        this.destinationPath(`gulp/${file}.js`), {
          paths: this.paths,
          markupLanguage: this.options.markupLanguage,
          clientId: this.options.clientId,
          projectId: this.options.projectId,
          frontEndFramework: this.options.frontEndFramework,
          jQuery: this.options.jQuery
        }
      )
    )
  }

  writeProjectConfigFile () {
    var configJson = {
      'projectName': this.options.projectName,
      'qtyScreens': this.options.qtyScreens,
      'markupLanguage': this.options.markupLanguage,
      'frontEndFramework': this.options.frontEndFramework,
      'jQuery': this.options.jQuery || this.options.frontEndFramework,
      'generatedBy': 'Pixel2HTML',
      'generatorVersion': pkg.version,
      'generatedAt': new Date(),
    }

    this.fs.writeJSON('./.project.conf', configJson)
  }

  configurePkgJson () {
    const { projectName } = this.options

    const pkgJson = {
      name: projectName,
      description: `${projectName} front end source code`,
      version: '1.0.0',
      repository: 'https://www.pixel2html.com',
      license: 'MIT',
      scripts: {
        start: 'npm install',
        code: 'gulp',
        build: 'gulp build --prod',
        release: 'gulp release --prod',
        'lint:js': "eslint 'src/**/*.js'",
        'fix:js': "eslint 'src/**/*.js' --fix",
        'lint:scss': "stylelint 'src/**/*.scss'",
        lint: 'npm run lint:js; npm run lint:scss',
        debug: 'gulp scripts --debug'
      },
      dependencies: {},
      devDependencies: {},
      stylelint: {
        extends: '@pixel2html/stylelint-config'
      },
      eslintConfig: {
        extends: '@pixel2html/eslint-config'
      }
    }

    return this.fs.extendJSON(this.destinationPath('package.json'), pkgJson)
  }

  installDependencies () {
    const { frontEndFramework, jQuery } = this.options

    const MUST_HAVE = [
      '@pixel2html/pipes',
      '@pixel2html/scripts-frontend',
      'del',
      'fs-path',
      'gulp',
      'gulp-zip',
      'yargs',
    ]

    const CONDITIONALS = []

    if (frontEndFramework === 'bootstrap-4') {
      CONDITIONALS.push('bootstrap')
      CONDITIONALS.push('popper.js')
    }

    if (frontEndFramework === 'bootstrap-3') {
      CONDITIONALS.push('bootstrap-sass')
    }

    if (frontEndFramework === 'foundation') {
      CONDITIONALS.push('foundation-sites')
    }

    if (jQuery || frontEndFramework) {
      CONDITIONALS.push('jquery')
    }

    return this.npmInstall([
      ...MUST_HAVE,
      ...CONDITIONALS
    ], { save: true })
  }

  installDevDeps () {
    const DEV = [
      '@pixel2html/stylelint-config',
      'browser-sync',
      'react-dev-utils',
      'stylelint',
    ]
    return this.npmInstall(DEV, { 'save-dev': true })
  }

  eslintJs () {
    const jsFilter = filter(['**/*.js'], { restore: true })
    const jsonFilter = filter(['**/*.json'], { restore: true })
    this.registerTransformStream([
      jsonFilter,
      prettify({
        indent_size: 2
      }),
      jsonFilter.restore
    ])
    this.registerTransformStream([
      jsFilter,
      eslint({
        fix: true
      }),
      eslint.format(),
      jsFilter.restore
    ])
  }
}

module.exports = PixelGenerator
