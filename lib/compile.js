var path = require('path')
var minify = require('html-minifier').minify
var utils = require('./utils')
var gutil = require('gulp-util')

var escapeContent = function(content, quoteChar, indentString) {
  var bsRegexp = new RegExp('\\\\', 'g');
  var quoteRegexp = new RegExp('\\' + quoteChar, 'g');
  var nlReplace = '\\n' + quoteChar + ' +\n' + indentString + indentString + quoteChar;
  return content.replace(bsRegexp, '\\\\').replace(quoteRegexp, '\\' + quoteChar).replace(/\r?\n/g, nlReplace);
}

// convert Windows file separator URL path separator
var normalizePath = function(p) {
  if(path.sep !== '/') {
    p = p.replace(/\\/g, '/')
  }
  return p
}

// Warn on and remove invalid source files (if nonull was set).
var existsFilter = function(filepath) {
  if(!utils.fileExists(filepath)) {
    gutil.log('Source file "' + filepath + '" not found', gutil.colors.cyan("123"))
    return false
  } else {
    return true
  }
}

// return template content
var getContent = function(contents, quoteChar, indentString, htmlmin) {
  var content = contents

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
var compileTemplate = function(moduleName, contents, quoteChar, indentString, useStrict, htmlmin) {

  var content = getContent(contents, quoteChar, indentString, htmlmin)
  var doubleIndent = indentString + indentString
  var strict = (useStrict) ? indentString + quoteChar + 'use strict' + quoteChar + ';\n' : ''

  var module = 'angular.module(' + quoteChar + moduleName +
    quoteChar + ', []).run([' + quoteChar + '$templateCache' + quoteChar + ', function($templateCache) ' +
    '{\n' + strict + indentString + '$templateCache.put(' + quoteChar + moduleName + quoteChar + ',\n' + doubleIndent  + quoteChar +  content +
     quoteChar + ');\n}]);\n'

  return module
}

module.exports = function(filepath, options, callback) {

  options.base= options.base || 'src'
  options.quoteChar= options.quoteChar || '"'
  options.indentString= options.indentString || '  '
  options.target= options.target || 'js'
  options.htmlmin= options.htmlmin || {}
  options.useStrict= options.useStrict || false

  function getModule(filepath) {
    if(existsFilter(filepath)) {
      var moduleName = normalizePath(path.relative(options.base, filepath))

      if (utils.kindOf(options.rename) === 'function') {
        moduleName = options.rename(moduleName)
      }
      if (options.target === 'js') {
        return compileTemplate(moduleName, options.contents, options.quoteChar, options.indentString, options.useStrict, options.htmlmin)
      } else {
        gutil.log('Unknow target "' + options.target + '" specified')
      }
    }
  }

  callback(null, getModule(filepath))
}
