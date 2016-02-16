gulp-html2js
============

Gulp plugin for converting AngularJS templates to JavaScript

See more from [grunt-html2js](https://github.com/karlgoldstein/grunt-html2js)


## Install
Install with [npm](https://npmjs.org/package/gulp-html2js)
`npm install --save-dev gulp-html2js`

## Usage

```javascript
var gulp = require('gulp')
var concat = require('gulp-concat')
var html2js = require('gulp-html2js')

gulp.task('default', function () {
    gulp.src('templates/*.html')
        .pipe(html2js({
            outputModuleName: 'template-test',
            useStrict: true,
            target: 'js'
        }))
        .pipe(concat('template.js'))
        .pipe(gulp.dest('dist/'))
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
