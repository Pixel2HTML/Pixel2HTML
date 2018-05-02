const baseFiles = [
  'LICENSE',
]

const baseTemplates = [
  'package.json',
  'README.md'
]

const dotfiles = [
  'editorconfig',
  'gitignore',
  'gitattributes',
]

const dotTemplates = [
  'tern-project',
]

const gulpFiles = [
  'gulp/common/cssModulesWrite.js',
  'gulp/common/fonts.js',
  'gulp/common/scripts.js',
  'gulp/common/styles.js',
  'gulp/development/serve.js',
  'gulp/production/minifyStyles.js',
  'gulp/production/purify.js',
  'gulp/production/styles-production.js',
  'gulp/production/zip.js',
]

const gulpTemplates = [
  'gulpfile.js',
  'gulp/config.js',
  'gulp/common/markup.js',
  'gulp/common/static.js',
  'gulp/development/watch.js',
]

const scss = [
  'styles/main/components/_buttons.scss',
  'styles/main/components/_forms.scss',
  'styles/main/screens/_base.scss',
  'styles/main/_mixins.scss',
  'styles/main/_variables.scss',
  'styles/vendor/_reset.scss',
]

const templateScss = [
  'styles/vendor/vendor.scss',
  'styles/main/main.scss',
]

module.exports = {
  baseFiles,
  baseTemplates,
  dotfiles,
  dotTemplates,
  gulpFiles,
  gulpTemplates,
  scss,
  templateScss
}
