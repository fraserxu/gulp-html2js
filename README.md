gulp-html2js
============

Gulp plugin for converting AngularJS templates to JavaScript

See more from [grunt-html2js](https://github.com/karlgoldstein/grunt-html2js)


## Install
Install with [npm](https://npmjs.org/package/gulp-html2js)
`npm install --save-dev gulp-html2js`

## Usage

```javascript
var concat = require('gulp-concat')
var html2js = require('gulp-html2js')

gulp.task('scripts', function() {
  gulp.src('fixtures/*.html')
    .pipe(html2js())
    .pipe(concat('template.js'))
    .pipe(gulp.dest('./'))
})
```

## Available options
* base - default to "src"
* quoteChar - default to "
* indentString - default to "  " (two spaces)
* target (coffee support to be added)
* useStrict - default to false
* outputModuleName - default ot module name

## LICENSE

(MIT License)

Copyright (c) 2013 Fraserxu <xvfeng123@gmail.com>
