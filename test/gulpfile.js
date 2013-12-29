var html2js = require('../')
var gutil = require('gulp-util')
var gulp = require('gulp')

gulp.task('html2js', function() {
  gulp.src(['fixtures/*.tpl.html'])
    .pipe(html2js({
      dest: 'tmp/templates.js'
    }))
})
