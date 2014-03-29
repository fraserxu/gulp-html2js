var gulp = require('gulp')
var concat = require('gulp-concat')
var html2js = require('../')

gulp.task('default', function() {
  gulp.src('templates/*.html')
    .pipe(html2js({
      outputModuleName: 'template-test',
      useStrict: true
    }))
    .pipe(concat('template.js'))
    .pipe(gulp.dest('dist/'))
})
