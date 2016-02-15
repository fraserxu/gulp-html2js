var gulp = require('gulp')
var concat = require('gulp-concat')
var html2js = require('../')

gulp.task('default', function () {
    gulp.src('templates/*.html')
        .pipe(html2js('js-demo.js', {
            adapter: 'javascript',
            name: 'demo',
            base: 'templates'
        }))
        .pipe(gulp.dest('dist/'))

    gulp.src('templates/*.html')
        .pipe(html2js('angular.js', {
            adapter: 'angular',
            name: 'angular-demo'
        }))
        .pipe(gulp.dest('dist/'))
});

