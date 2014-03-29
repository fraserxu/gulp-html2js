var map = require('map-stream')
var gutil = require('gulp-util')
var compile = require('./lib/compile')

module.exports = function(options) {
  options = options || {}

  return map(function(file, cb) {
    compile(file, options, function(err, data) {
      if (err) return cb(err)

      file.contents = new Buffer(data)

      cb(null, file)
    })
  })
}
