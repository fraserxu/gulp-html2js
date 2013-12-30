var gulp = require('gulp')
var concat = require('gulp-concat')
var html2js = require('./')

gulp.task('scripts', function() {
  gulp.src('./test/fixtures/*.html')
    .pipe(html2js())
    .pipe(concat('template.js'))
    .pipe(gulp.dest('./test/'))
})
