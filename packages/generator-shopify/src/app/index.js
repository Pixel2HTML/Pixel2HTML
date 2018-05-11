import Yeoman from 'yeoman-generator'
import cowsay from 'cowsay-browser'
import chalk from 'chalk'
import filesToAssert from './lib/filesToAssert'

import filter from 'gulp-filter'
import prettify from 'gulp-jsbeautifier'
import updateNotifier from 'update-notifier'
import eslint from 'gulp-eslint'

const pkg = require('../../package.json')

class ShopifySkeleton extends Yeoman {
  notify () {
    updateNotifier({pkg}).notify()
  }

  welcome () {
    this.log('')
    this.log(chalk.cyan(' ****************************************************'))
    this.log(chalk.cyan('  Welcome to'), chalk.white.bold('@pixel2html/generator-shopify'))
    this.log(chalk.white('  A Yeoman generator for scaffolding Shopify projects'))
    this.log(chalk.cyan('  Version'), chalk.white.bold(` ${pkg.version}`))
    this.log(chalk.cyan(' ****************************************************'))
  }

  vaderSays () {
    const generalOverview = cowsay.say({
      text: 'A few general purpose questions now...',
      f: 'vader'
    })
    return this.log(chalk.red(generalOverview))
  }

  mustHavePrompts () {
    return this.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Name of your Project?'
      },
      {
        type: 'confirm',
        name: 'npmInstall',
        message: 'Want me to run npm install after we\'re done?',
        default: false
      }
    ])
      .then(props => {
        this.options.projectName = props.projectName
        this.options.npmInstall = props.npmInstall
      })
  }

  suchTalk () {
    const dogeText = 'To set up a shop now you will need to have' + '\n' +
    'private API credentials at hand see more here:' + '\n' +
    'https://help.shopify.com/api/getting-started/api-credentials'
    const muchWow = cowsay.think({
      text: dogeText,
      f: 'doge'
    })
    return this.options.noAnims
      ? this.log(chalk.magenta(muchWow))
      : this.log(chalk.hex('#b69a4e')(muchWow))
  }

  setShopNowPrompt () {
    return this.prompt([
      {
        type: 'confirm',
        name: 'setShopNow',
        message: 'Do you want to set up your shop credentials now?',
        default: true
      }
    ])
      .then(props => {
        this.options.setShopNow = props.setShopNow
      })
  }

  shopifyConfigs () {
    return this.options.setShopNow
      ? this.prompt([
        {
          type: 'input',
          name: 'shopName',
          message: 'Shop Name (Its the part that goes before the .myshopify.com bit on the admin)'
        },
        {
          type: 'input',
          name: 'shopKey',
          message: 'API Key'
        }, {
          type: 'input',
          name: 'shopPassword',
          message: 'Password'
        }, {
          type: 'input',
          name: 'shopSecret',
          message: 'Shared Secret'
        }, {
          type: 'input',
          name: 'shopThemeId',
          message: 'Theme ID (Create a new theme click customize HTML/CSS and its after the themes/ part on the URL)'
        }
      ])
        .then(props => {
          this.options.shopName = props.shopName
          this.options.shopKey = props.shopKey
          this.options.shopPassword = props.shopPassword
          this.options.shopSecret = props.shopSecret
          this.options.shopThemeId = props.shopThemeId
        })
      : false
  }

  copyShopifyCoreFiles () {
    const {
      projectName
    } = this.options
    const templates = {
      author: 'Pixel2HTML',
      projectName
    }
    return filesToAssert.shopifyCoreFiles.map(file => {
      this.fs.copyTpl(
        this.templatePath(`theme/${file}`),
        this.destinationPath(`src/theme/${file}`),
        templates
      )
    })
  }

  copyDotFiles () {
    const {
      projectName,
      shopName,
      shopKey,
      shopPassword,
      shopSecret,
      shopThemeId,
      setShopNow
    } = this.options

    const version = pkg.version

    const templates = {
      projectName,
      shopName,
      shopKey,
      shopPassword,
      shopSecret,
      shopThemeId,
      setShopNow,
      version
    }

    return filesToAssert.dotfiles.map(file => {
      this.fs.copyTpl(
        this.templatePath(`base/${file}`),
        this.destinationPath(`.${file}`),
        templates
      )
    })
  }

  copyBaseFiles () {
    const {
      projectName,
      shopName,
      shopKey,
      shopPassword,
      shopSecret,
      shopThemeId,
      setShopNow
    } = this.options

    const version = pkg.version

    const templates = {
      projectName: projectName.split(' ').join('-'),
      shopName,
      shopKey,
      shopPassword,
      shopSecret,
      shopThemeId,
      setShopNow,
      version
    }

    return filesToAssert.baseFiles.map(file => {
      this.fs.copyTpl(
        this.templatePath(`base/${file}`),
        this.destinationPath(file),
        templates
      )
    })
  }

  copyGulpFiles () {
    return filesToAssert.gulpFiles.map(file => {
      this.fs.copyTpl(
        this.templatePath(`gulp/${file}`),
        this.destinationPath(`gulp/${file}`),
        {
          author: 'Pixel2HTML'
        }
      )
    })
  }

  copyStaticFiles () {
    return filesToAssert.staticFiles.map(file => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(`src/${file}`),
        {
          author: 'Pixel2HTML'
        }
      )
    })
  }

  install () {
    this.options.npmInstall
      ? this.npmInstall()
      : this.log('Skipping npm install')
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

  end () {
    const message = this.options.setShopNow
      ? 'Thank you and Good Luck!'
      : 'Remember to fill in the variables inside .env so gulp can run'
    this.log(chalk.white((message + ' 🦄')))
    this.options.npmInstall
      ? this.log('PS: use npm run code to start')
      : this.log('Remember to install your dependencies first! npm install')
    return this.log('Love, Pixel2HTML')
  }
}

export default ShopifySkeleton
