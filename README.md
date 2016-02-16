gulp-html2js
============

Gulp plugin for converting AngularJS templates to JavaScript

See more from [grunt-html2js](https://github.com/karlgoldstein/grunt-html2js)


## Install
Install with [npm](https://npmjs.org/package/gulp-html2js)
`npm install --save-dev gulp-html2js`

## Usage

### Angular

```javascript
var gulp = require('gulp');
var html2js = require('gulp-html2js');

gulp.task('default', function () {
    gulp.src('templates/*.html')
        .pipe(html2js('angular.js', {
            adapter: 'angular',
            base: 'templates',
            name: 'angular-demo'
        }))
        .pipe(gulp.dest('dist/'));
})
```

### Vanilla

```javascript
var gulp = require('gulp');
var html2js = require('gulp-html2js');

gulp.task('default', function () {
    gulp.src('templates/*.html')
        .pipe(html2js('js-demo.js', {
            adapter: 'javascript',
            base: 'templates',
            name: 'js-demo'
        }))
        .pipe(gulp.dest('dist/'));
})
```

## Available options
* base - project source path default to "."
* quoteChar - default to "
* indentString - default to "  " (two spaces)
* target (coffee support to be added)
* useStrict - default to false
* outputModuleName - default ot module name

## LICENSE

(MIT License)

Copyright (c) 2015 Fraserxu <xvfeng123@gmail.com>
