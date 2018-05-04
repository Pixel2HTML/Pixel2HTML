# @pixel2html/scripts-frontend

[![npm version](https://badge.fury.io/js/%40pixel2html%2Fscripts-frontend.svg)](https://badge.fury.io/js/%40pixel2html%2Fscripts-frontend)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A highly shareable and customizable webpack config.

## Features

- Dynamic Imports (Code Splitting)
- ES2017+
- JSX
- Linting via `@pixel2html/eslint-config`
- Parsing all js (ours and vendor, vendor is cached though)
- Sourcemaps for debugging
- Tree-Shaking
- Extend and customize the underlying config

## Getting Started FAST!

```sh
npm install --dev @pixel2html/scripts-frontend
```


```sh
npx scripts-frontend development
```

:fire:

We have a set of opinions towards how the files should look like for it to be a zero-config situation.

```
# Your project root
.
├── dist
│   └── assets
│       └── js
│           └── main.js # Compiled file
└── src
    └── assets
        └── js
            └── index.js # Your starting point
```

That is to be compliant with the defaults we were using on our `generator-frontend` package, however this is easy to customize.

## Frontend Generator

If you're using our [Frontend Generator](http://npm.im/@pixel2html/generator-frontend) or our [Shopify Generator](http://npm.im/@pixel2html/generator-shopify) then you don't have to to anything since they already use this package.
But if you're coming from scratch this is what you need to do:


## Node

Create an `index.js` with the following:

```js
const { compiler } = require('@pixel2html/scripts-frontend')

// Options are development, production or debug
const mode = 'development'
console.log(`Compiling in ${mode} mode...`)

compiler(mode)
  .then(() => console.log(`All done!!`))
  .catch(e => console.log(e))
```

You can now run `node index` to get your JS compiled.


## Gulp

```js
const gulp = require('gulp')
const { compiler } = require('@pixel2html/scripts-frontend')

gulp.task('start', () => compiler('development'))
gulp.task('build', () => compiler('production'))

gulp.task('default', gulp.series('start'))
```

## Customizing the underlying config

To customize your setup you need to create a `scripts.config.js` file at the root of your project that file will be a function that takes 2 parameters:

- config (the default config) [See Webpack Config](https://webpack.js.org/configuration/)
- webpack (a webpack instance so you can use plugins and whatever)


`scripts.config.js`

```js
module.exports = function(config, webpack) {
  // tweak away esketit

  // Always return the config
  return config
}
```

## Shopify

Since we do quite a bit of Shopify ourselves we added some opinionated list of shopify plugins which you can access like this:

`scripts.config.js`

```js
const { getShopifyPlugins } = require('@pixel2html/scripts-generator')

module.exports = (config, webpack) => {
  config.plugins = getShopifyPlugins()

  // So the sourcemaps work on Shopify
  config.output.filename = '[name].js.liquid'
  return config
}
```

## Shopify Generator

We also supplied a fully opinionated Shopify config which you can setup like this:

`scripts.config.js`

```js
const { createShopifyConfig } = require('@pixel2html/scripts-frontend')

module.exports = config => createShopifyConfig(config)
```

:fire:

This is compliant with the way our Shopify Generator works meaning your starting point is:

`src/scripts/index.js`

and the bundle outputs to:

`.deploy/assets/main.js.liquid`

While splitting vendor code from node_modules to:

`.deploy/assets/vendor.js.liquid`

The liquid extension is used for sourcemaps support via Shopify Cache busting situation for assets.

Check the examples folder for some reasonable examples.

## PRs Welcome!

Open an issue so we can discuss about it, then file a PR. :heart_eyes:

Love,

[Pixel2HTML](https://pixel2html.com/)
