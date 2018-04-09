# @pixel2html/browserlist
Our official supported browserlist

Just a shareable pluggable browserlist that we use in different projects and that's inline with our own devices support policy.

## Browserlist

Right now we support the following browsers:

```js
const browsers = [
  'last 2 Chrome versions',
  'last 2 ChromeAndroid versions',
  'last 2 Firefox versions',
  'last 2 Safari versions',
  'last 2 ios versions',
  'last 1 ie versions',
  'last 2 Edge versions',
  'last 2 Opera versions'
]
```

You can see it visually right here: [browserl.ist link](http://browserl.ist/?q=last+2+chrome+versions%2C+last+2+safari+versions%2C+last+2+ChromeAndroid+versions%2C+last+2+Firefox+versions%2C+last+2+ios+versions%2C+last+1+ie+versions%2C+last+2+Edge+versions%2C+last+2+Opera+versions)

## Usage

```sh
npm install @pixel2html/browserlist postcss autoprefixer
```

```js
const postcss = require('postcss')
const browserlist = require('@pixel2html/browserlist')
const autoprefixer = autoprefixer

// more css stuff

postcss([
  autoprefixer(browserlist)
])

// Profit??

```
