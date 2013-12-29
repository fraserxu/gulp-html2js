var es = require('event-stream')
var guitl = require('gulp-util')
var path = require('path')
var fs = require('fs')
var iconv = require('iconv-lite')
var minify = require('html-minifier').minify

module.exports = function(opt) {

  var escapeContent = function(content, quoteChar, indentString) {
    var bsRegexp = new RegExp('\\\\', 'g')
    var quoteRegexp = new RegExp('\\' + quoteChar, 'g')
    var nlReplace = '\\n' + quoteChar + ' +\n' + indentString + indentString + quoteChar
    return content.replace(bsRegexp, '\\\\').replace(quoteRegexp, '\\' + quoteChar)
      .replace(/\r?\n/g, nlReplace)
  }

  // convert Windows file separator URL path separator
  var normalizePath = function(p) {
    if(path.sep !== '/') {
      p = p.replace(/\\/g, '/')
    }
    return p
  }

  var fileExist = function() {
    var filepath = path.join.apply(path, arguments)
    return fs.existsSync(filepath)
  }

  // Read a file, return its contents.
  var readFile = function(filepath, options) {
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
      throw gutil.log('Unable to read "' + filepath + '" file (Error code: ' + e.code + ').', e);
    }
  };

  // Warn on and remove invalid source files (if nonull was set).
  var existFilter = function(filepath) {
    if(!fileExist(filepath)) {
      gutil.log('Source file "' + filepath + '" not found', gutil.colors.cyan("123"))
      return false
    } else {
      return true
  }

  // return template content
  var getContent = function(filepath, quoteChar, indentString, htmlmin) {
    var content = readFile(filepath)

    if(Object.keys(htmlmin).length) {
      try{
        content = minify(content, htmlmin)
      } catch(err) {
        gutil.log(filepath + '\n' + err)
      }
    }

    return escapeContent(content, quoteChar, indentString)
  }

  // compile a template to an angular module
  var compileTemplate = function(moduleName, filepath, quoteChar, indentString, useStrict, htmlmin) {

    var content = getContent(filepath, quoteChar, indentString, htmlmin)
    var doubleIndent = indentString + indentString
    var strict = (useStrict) ? indentString + quoteChar + 'use strict' + quoteChar + ';\n' : ''

    var module = 'angular.module(' + quoteChar + moduleName +
      quoteChar + ', []).run([' + quoteChar + '$templateCache' + quoteChar + ', function($templateCache) ' +
      '{\n' + strict + indentString + '$templateCache.put(' + quoteChar + moduleName + quoteChar + ',\n' + doubleIndent  + quoteChar +  content +
       quoteChar + ');\n}]);\n'

    return module
  }

  function compile(file, cb) {

  }

  return es.map(compile)
}
