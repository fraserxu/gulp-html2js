var es = require('event-stream')
var gutil = require('gulp-util')
var compile = require('./lib/compile')
var clone = require('clone')

module.exports = function(options) {
  options = options || {}

  return es.map(function(file, cb) {
    var newFile = clone(file)
    options.contents = file.contents.toString()

    compile(file.path, options, function(err, data) {
      if (err) {
        return cb(err)
      }

      var newContents = data
      newFile.contents = new Buffer(newContents)

      gutil.log('gulp-html2js write: ' + data)
      cb(null, newFile)
    })
  })
}
