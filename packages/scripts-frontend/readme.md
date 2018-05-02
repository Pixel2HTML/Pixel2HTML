# @pixel2html/scripts-frontend

A highly shareable and customizable webpack config.

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
const compiler = require('@pixel2html/scripts-frontend')

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
const compilator = require('@pixel2html/scripts-frontend')

gulp.task('start', async done => {
  try {
    await compilator('development')
    done()
  } catch (e) {
    console.log(e)
    done()
  }
})
```
Check our examples folder for examples with custom configurations, gulp and npm-scripts.


## Customizing

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

Check the examples folder for some reasonable examples.

## PRs Welcome!

Open an issue so we can discuss about it, then file a PR. :heart_eyes:

Love,

[Pixel2HTML](https://pixel2html.com/)
