var es = require('event-stream')
var guitl = require('gulp-util')
var compile = require('./lib/compile')

module.exports = function(options) {
  options = options || {}

  return es.map(function(file, cb) {
    file.contents = file.contents.toString()

    compile(file.path, options, function(err, data) {
      if (err) {
        return cb(err)
      }

      gutil.log('gulp-html2js:\n' + data[0].output.join('\n'))
      cb(null, file)
    })
  })
}
