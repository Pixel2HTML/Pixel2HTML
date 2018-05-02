# @pixel2html/scripts-frontend

A highly shareable and customizable webpack config.

## Getting Started

If you're using our [Frontend Generator](http://npm.im/@pixel2html/generator-frontend) or our [Shopify Generator](http://npm.im/@pixel2html/generator-shopify) then you don't have to to anything since they already use this package.
But if you're coming from scratch this is what you need to do:

```sh
npm install --dev @pixel2html/scripts-frontend
```

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

Check our examples folder for examples with custom configurations, gulp and npm-scripts.

We have a set of opinions towards how the files should look like for it to be a zero-config situation.

```
# Your project root
.
├── dist
│   └── assets
│       └── js
│           └── main.js
└── src
    └── assets
        └── js
            └── index.js
```

That is to be compliant with the defaults we were using on our `generator-frontend` package, however this is easy to customize.

## Customizing

To customize your setup you need to create a `scripts.config.js` file at the root of your project that file will be a function that takes 2 parameters:

- config (the default config)
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
