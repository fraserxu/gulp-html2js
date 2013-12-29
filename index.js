var es = require('event-stream')
var gutil = require('gulp-util')
var compile = require('./lib/compile')

module.exports = function(options) {
  options = options || {}

  console.log(options)

  return es.map(function(file, cb) {
    options.contents = file.contents.toString()

    compile(file.path, options, function(err, data) {
      if (err) {
        return cb(err)
      }

      gutil.log('gulp-html2js write: ' + data)
      cb(null, file)
    })
  })
}
