gulp-html2js(WIP)
============

Gulp plugin for converting AngularJS templates to JavaScript

### See more from [grunt-html2js](https://github.com/karlgoldstein/grunt-html2js)

## Information

<table>
<tr>
<td>Package</td><td>gulp-html2js</td>
</tr>
<tr>
<td>Description</td>
<td>Converting AngularJS templates to JavaScript</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.4</td>
</tr>
</table>

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

## Overview

Angular-JS normally loads templates lazily from the server as you reference them in your application (via `ng-include`, routing configuration or other mechanism). Angular caches the source code for each template so that subsequent references do not require another server request. However, if your application is divided into many small components, then the initial loading process may involve an unacceptably large number of additional server requests.

This plugin converts a group of templates to JavaScript and assembles them into an Angular module that primes the cache directly when the module is loaded. You can concatenate this module with your main application code so that Angular does not need to make any additional server requests to initialize the application.

Note that this plugin does not compile the templates. It simply caches the template source code.

## LICENSE

(MIT License)

Copyright (c) 2013 Fraserxu <xvfeng123@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
