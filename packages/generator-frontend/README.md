# @pixel2html/generator-frontend

[![Build Status](https://travis-ci.org/Pixel2HTML/pixel2html-generator.svg?branch=master)](https://travis-ci.org/Pixel2HTML/pixel2html-generator)

<img src="https://cldup.com/2znve50RiO.svg" alt="Cool demo" />

We aim to generate a boilerplate code for projects when we know the specs. 💕

## How to install

#### Node

You will need `node` installed in your machine. In case you don't have it (you can check this typing `node --version` in your terminal) please visit [this link](https://nodejs.org/en/download/).

We also need to install **Yeoman**, and the **Pixel2HTML Generator**, so run this command in your terminal. The `-g` parameter is to install them globally so can use it in every project.
```shell
$ npm install -g yo @pixel2html/generator-frontend
```

## Running the generator

To generate the **Pixel2HTML Boilerplate** go to your project folder and run this command in your shell

```
$ cd ~/your/project/folder
$ yo @pixel2html/frontend
```
The **Pixel2HTML Boilerplate** will ask you questions about this points. Answering with the desired options will generate the code.

* Project Name?
* Quantity of screens?
* Markup Language? _Options: HTML / Pug_
* Frontend Framework _Options: None / Bootstrap 3.*/ Bootstrap 4 Beta / Foundation_
* jQuery? _Options: true / false_

There are also two more way to generate your files, you can find the instructions in the [Wiki](https://github.com/Pixel2HTML/pixel2html-generator/wiki/Running-the-Pixel2HTML-Generator)


## Installing dependencies & running up
To work, the **Pixel2HTML Boilerplate** needs to install some dependencies to run the options you select.
For this job, run this command in your shell

```
$ npm run start
```

## Generated file structure

This boilerplate will create a set of files and folders

```

├──  dist/
├──  gulp/
├──  src/
│    └──  assets/
│    │    ├──  fonts/
│    │    ├──  icons/
│    │    ├──  images/
│    │    ├──  js/
│    │    ├──  styles/
│    │    │    ├──  components/
│    │    │    │    ├──  _buttons.scss
│    │    │    │    ├──  _forms.scss
│    │    │    │    └──  _nav.scss
│    │    │    ├──  screens/
│    │    │    │    ├──  _base.scss
│    │    │    │    └──  screen_*.scss
│    │    │    ├── _mixins.scss
│    │    │    ├── _reset.scss
│    │    │    ├── _variables.scss
│    │    │    ├── main.scss
│    │    │    └── vendor.scss
│    └──  screen_*.[html|pug]
├──  .editorcofig
├──  .gitattributes
├──  .gitignore
├──  .project.conf
├──  gulpfile.js
├──  package.json
└──  README.md
```

## How to work with script files

We are using [WebpackJS](https://webpack.js.org/) to bundle our script files. There's also ES6 on-demand transpilation and polyfills.

Learn more about Javascript Modules here [Wes Bos Article About Modules](http://wesbos.com/javascript-modules/)

### Example

```js
import $ from 'jquery'
import 'bootstrap-sass'

```

We also included the amazing `webpack-bundle-analyzer` you can fine tweak you JS bundle size if you wish to. Fire it up running this command:

```
$ npm run debug
```



## Available script commands.

### Start to code.
* `$ npm run code`

### Build the project
* `$ npm run build`


## Available Gulp Commands

### Helpers
* `$ gulp clean` Clean /dist directory

### Static Files
* `$ gulp main:static` Compile static files (images, icons)
* `$ gulp main:images` Move images
* `$ gulp main:icons` Move icons

### Fonts Files
* `$ gulp main:fonts` Move project fonts
* `$ gulp vendor:fonts` Move vendors fonts

### Scripts
* `$ gulp main:scripts` Concat, uglify and move project JS files
* `$ gulp vendor:scripts` Concat, uglify and move vendors JS files

### Styles
* `$ gulp main:styles` Compile, concat, autoprefix and move [SCSS, Less, Stylus] project files
* `$ gulp vendor:styles` Compile, concat, autoprefix and move [SCSS, Less, Stylus] vendor files

### Delivery
 * `$ gulp build` Execute all the gulp directives and makes a `.zip` file with the latest code.
 * `$ gulp release` Execute all the gulp directives and makes a `.zip` file with the latest code.
 * `$ gulp release --prod` Execute all the gulp directives, prepare assets to production and makes a `.zip` file with the latest code.
