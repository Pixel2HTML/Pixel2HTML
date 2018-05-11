const shopifyCoreFiles = [
  // CONFIG
  'config/settings_schema.json',
  // LAYOUT
  'layout/checkout.liquid',
  'layout/theme.liquid',
  // LOCALES
  'locales/en.default.json',
  'locales/es.json',
  // SECTIONS
  'sections/featured-collection.liquid',
  // SNIPPETS
  'snippets/svg-icons.liquid',
  // CUSTOMERS
  'templates/customers/account.liquid',
  'templates/customers/activate_account.liquid',
  'templates/customers/addresses.liquid',
  'templates/customers/login.liquid',
  'templates/customers/order.liquid',
  'templates/customers/register.liquid',
  'templates/customers/reset_password.liquid',
  // TEMPLATES NORMAL
  'templates/404.liquid',
  'templates/article.liquid',
  'templates/blog.liquid',
  'templates/cart.liquid',
  'templates/collection.liquid',
  'templates/gift_card.liquid',
  'templates/index.liquid',
  'templates/list-collections.liquid',
  'templates/page.contact.liquid',
  'templates/page.liquid',
  'templates/password.liquid',
  'templates/product.liquid',
  'templates/search.liquid'
]

const dotfiles = [
  'env',
  'env.example',
  'gitignore'
]

const baseFiles = [
  'LICENSE',
  'editorconfig',
  'gulpfile.js',
  'package.json',
  'readme.md',
  'scripts.config.js'
]

const gulpFiles = [
  'gulp.config.js',
  // Tasks
  'tasks/clean.js',
  'tasks/deploy.js',
  'tasks/fonts.js',
  'tasks/icons.js',
  'tasks/images.js',
  'tasks/scripts.js',
  'tasks/serve.js',
  'tasks/shopify.js',
  'tasks/styles.js',
  'tasks/watch.js',
  'tasks/zip.js'
]

const staticFiles = [
  'fonts/.gitkeep',
  'icons/gulp.svg',
  'images/shopify.svg',
  'scripts/index.js',
  'scripts/async-button.js',
  'scripts/public-path.js',
  'scripts/index.js',
  'styles/main.scss',
  'styles/vendor.scss'
]

module.exports = {
  shopifyCoreFiles,
  baseFiles,
  gulpFiles,
  staticFiles,
  dotfiles
}
