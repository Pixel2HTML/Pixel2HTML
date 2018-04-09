# 2.4.15
- Updating favicon to a generic JS one
- Webpack 4 being used

# 2.3.2
- Removed jekyll
- 100/100 lighthouse and google pagespeed insights
- Bootstrap 4 out of beta
- Fewer dependencies
- Decouple gulp tasks from this package

# 2.2.0
- HMR
- CSS HMR
- PurifyCSS
- CriticalCSS

### 2.1.0
- Add Bootstrap 4 Beta as an Frontend Framework option
- Decouple jQuery from bundle on production mode.
- Keep alive the opened browser tab when you hit `npm run code`. Thanks Facebook!



### 2.0.0
- Reduced number of total dependencies
- Webpack integration to handle JS files
- God mode svg inline icons with pug mixins
- Unified fonts task
- Deploy via FTP
- Jekyll and HTML both are now Environment aware 💅
- No more support to LESS & Stylus css preprocessors. (Help: https://github.com/Pixel2HTML/pixel2html-generator/wiki/Using-other-styles-preprocessor-language)
- No more support to BassCss framework

### 1.3.5
- Minor fixes.

### 1.3.4
- Fixed some minor bugs on JS compilation.
- Minor other fixes.

### 1.3.3
- Fixed some minor bugs on Jekyll builds.
- Smarter use of config variables to gulp routines.
- Updated dependencies versions.
- Some tests improvement.
- `projectName` variable instead of `projectId` to generate more white label projects.

### 1.3.2
- Fix some miss references to vendor fonts
- Updated JS syntax to ES6
- Minor fixes

### 1.3.1
- Added missing references to vendor scripts on pug base files

#### 1.3.0
- Migrate to Gulp 4.
- Import reset.css only when there no selected FrontEnd Framework.
- Added `production` flag to gulp tasks to speed up the compilation process on `development` mode (no mins, no compressions).
- Added CSScomb.
- Added PurifyCSS.
- Improvements in the PUG file structure, now it have some layouts, mixins and imports.
- Moved `sourcemaps` to a external file.
- Removed useless Gulp Plumber.
- Added some SVG magic by default.

#### 1.2.3
- Added fonts support to default gulp routine.

#### 1.2.2
- Added `dist` directories configuration on `config.js` file.
- Added Zurb Foundation initializer on `main.js` file.
- Updated library versions.

#### 1.2.1
- Fixed version name.

#### 1.2.0
- Added Jekyll support.
- Removed vendor gulp tasks in favor of `config.js`.
- Added gulp group css media queries support.
- Improved bower inclusion of libs on index.js.

#### 1.1.2
- Added PUG/Jade support.

#### 1.1.0
- Minor bugfixing.
- Removed `gitlab-ci.yml` integration.
- Add generator version to config file.

#### 1.0.0
- Initial release.
