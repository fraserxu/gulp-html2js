var guitl = require('gulp-util')
var fs = require('fs')
var path = require('path')

var utils = modules.exports = {}

// True if the file path exists.
utils.fileExists = function() {
  var filepath = path.join.apply(path, arguments)
  return fs.existsSync(filepath)
}

// Read a file, return its contents.
utils.readFile = function(filepath, options) {
  if (!options) { options = {}; }
  var contents;
  gutil.log('Reading ' + filepath + '...');
  try {
    contents = fs.readFileSync(String(filepath));
    // If encoding is not explicitly null, convert from encoded buffer to a
    // string. If no encoding was specified, use the default.
    if (options.encoding !== null) {
      contents = iconv.decode(contents, options.encoding || file.defaultEncoding);
      // Strip any BOM that might exist.
      if (!file.preserveBOM && contents.charCodeAt(0) === 0xFEFF) {
        contents = contents.substring(1);
      }
    }
    return contents;
  } catch(e) {
    gutil.log('Unable to read "' + filepath + '" file (Error code: ' + e.code + ').', e);
  }
};

// What "kind" is a value?
// I really need to rework https://github.com/cowboy/javascript-getclass
var kindsOf = {};
'Number String Boolean Function RegExp Array Date Error'.split(' ').forEach(function(k) {
  kindsOf['[object ' + k + ']'] = k.toLowerCase();
});
utils.kindOf = function(value) {
  // Null or undefined.
  if (value == null) { return String(value); }
  // Everything else.
  return kindsOf[kindsOf.toString.call(value)] || 'object';
};