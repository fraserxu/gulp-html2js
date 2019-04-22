gulp4-html2js
============

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]

Fork for gulp-html2js package. 
Resolved all vulnerabilities, removed depricated gulp-utils.
Gulp v4 plugin for converting AngularJS templates to JavaScript

See more from [grunt-html2js](https://github.com/karlgoldstein/grunt-html2js)


## Install
Install with [npm](https://npmjs.org/package/gulp-html2js)
`npm install --save-dev gulp4-html2js`

## Usage

### Angular

```javascript
var gulp = require('gulp');
var html2js = require('gulp4-html2js');

gulp.task('default', function () {
    gulp.src('templates/*.html')
        .pipe(html2js('angular.js', {
            adapter: 'angular',
            base: 'templates',
            name: 'angular-demo'
        }))
        .pipe(gulp.dest('dist/'));
});
```

### Vanilla

```javascript
var gulp = require('gulp');
var html2js = require('gulp4-html2js');

gulp.task('default', function () {
    gulp.src('templates/*.html')
        .pipe(html2js('js-demo.js', {
            adapter: 'javascript',
            base: 'templates',
            name: 'js-demo'
        }))
        .pipe(gulp.dest('dist/'));
});
```

## Available options
* base - project source path default to "."
* quoteChar - default to "
* indentString - default to "  " (two spaces)
* target (coffee support to be added)
* useStrict - default to false
* name - module name

## LICENSE

(MIT License)

Copyright (c) 2015 Fraserxu <xvfeng123@gmail.com>

[npm-image]: https://img.shields.io/npm/v/gulp-html2js.svg?style=flat-square
[npm-url]: https://npmjs.org/package/gulp-html2js
[downloads-image]: http://img.shields.io/npm/dm/gulp-html2js.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/gulp-html2js
