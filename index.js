var es = require('event-stream')
var guitl = require('gulp-util')
var minify = require('html-minifier').minify

module.exports = function(opt) {
  function compile(file, cb) {
  
  }

  return es.map(compile)
}
