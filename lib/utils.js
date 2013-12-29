/*
 * This part comes from grunt library.
 * See more from https://github.com/gruntjs/grunt/tree/master/lib/grunt
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt/blob/master/LICENSE-MIT
 */

var gutil = require('gulp-util')
var fs = require('fs')
var path = require('path')
var iconv = require('iconv-lite')

var utils = module.exports = {}

// True if the file path exists.
utils.fileExists = function() {
  var filepath = path.join.apply(path, arguments)
  return fs.existsSync(filepath)
}

// What "kind" is a value?
// I really need to rework https://github.com/cowboy/javascript-getclass
var kindsOf = {}
'Number String Boolean Function RegExp Array Date Error'.split(' ').forEach(function(k) {
  kindsOf['[object ' + k + ']'] = k.toLowerCase()
})
utils.kindOf = function(value) {
  // Null or undefined.
  if (value == null) { return String(value) }
  // Everything else.
  return kindsOf[kindsOf.toString.call(value)] || 'object'
}

// The line feed char for the current system.
utils.linefeed = process.platform === 'win32' ? '\r\n' : '\n'

// Normalize linefeeds in a string.
utils.normalizelf = function(str) {
  return str.replace(/\r\n|\n/g, utils.linefeed)
}

// Write a file.
utils.writeFile = function(filepath, contents, options) {

  gutil.log('write file to ', filepath, ' with content ', contents)

  if (!options) { options = {} }
  // var nowrite = grunt.option('no-write')
  // gutil.log((nowrite ? 'Not actually writing ' : 'Writing ') + filepath + '...')
  // Create path, if necessary.
  utils.mkdir(path.dirname(filepath))
  // try {
    // If contents is already a Buffer, don't try to encode it. If no encoding
    // was specified, use the default.
    // if (!Buffer.isBuffer(contents)) {
      // contents = iconv.encode(contents, options.encoding || file.defaultEncoding)
    // }
    // Actually write file.
    // if (!nowrite) {
    console.log('filepath', filepath)
    fs.writeFileSync(filepath, contents)
    // }
    // grunt.verbose.ok()
    return true
  // } catch(e) {
    // console.log('error', e)
    // grunt.verbose.error()
    // throw grunt.util.error('Unable to write "' + filepath + '" file (Error code: ' + e.code + ').', e)
  // }
}

var pathSeparatorRe = /[\/\\]/g;

// Like mkdir -p. Create a directory and any intermediary directories.
utils.mkdir = function(dirpath, mode) {
  // if (grunt.option('no-write')) { return; }
  // Set directory mode in a strict-mode-friendly way.
  if (mode == null) {
    mode = parseInt('0777', 8) & (~process.umask());
  }
  dirpath.split(pathSeparatorRe).reduce(function(parts, part) {
    parts += part + '/';
    var subpath = path.resolve(parts);
    if (!utils.fileExists(subpath)) {
      try {
        fs.mkdirSync(subpath, mode);
      } catch(e) {
        gutil.log('Unable to create directory "' + subpath + '" (Error code: ' + e.code + ').', e);
      }
    }
    return parts;
  }, '');
};