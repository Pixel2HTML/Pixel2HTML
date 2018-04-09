# @pixel2html/pipes
Plugabble pipes for a composable gulp stream

```bash
npm install @pixel2html/pipes
```

## Example

```js
const gulp = require('gulp')
const styles = require('@pixel2html/pipes').styles

gulp.task('styles', () =>
  gulp.src('src/styles/**/!(_)*.scss')
    .pipe(styles({
      modules: true,
      name: 'main.css',
      production: process.env.NODE_ENV === 'production'
    })())
    .on('error', config.onError)
    .pipe(gulp.dest('dist/styles'))
)


```

## Contents

* critical: create critical CSS
* html: html with replace and posthtml
* minifyStyles: minimize, comb, groupCssMediaQueries and nano
* pug: pug and posthtml with modules
* purify: remove unused CSS
* styles: sourcemaps, postCss with modules and autoprefixer

## pixel2html boilerplate
We use this already on our own Frontend boilerplate, don't be shy and try it out 🎩
