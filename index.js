var es = require('event-stream')
var gutil = require('gulp-util')
var compile = require('./lib/compile')
var clone = require('clone')

module.exports = function(options) {
  options = options || {}

  return es.map(function(file, cb) {
    var newFile = clone(file)

    compile(file, options, function(err, data) {
      if (err) return cb(err)

      var newContents = data

      newFile.contents = new Buffer(newContents)

      cb(null, newFile)
    })
  })
}
