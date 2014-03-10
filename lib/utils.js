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

var utils = module.exports = {}

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
