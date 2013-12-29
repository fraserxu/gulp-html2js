var es = require('event-stream')
var guitl = require('gulp-util')
var path = require('path')
var iconv = require('iconv-lite')
var minify = require('html-minifier').minify
var utils = require('lib/utils')

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

  // Warn on and remove invalid source files (if nonull was set).
  var existFilter = function(filepath) {
    if(!utils.fileExist(filepath)) {
      gutil.log('Source file "' + filepath + '" not found', gutil.colors.cyan("123"))
      return false
    } else {
      return true
  }

  // return template content
  var getContent = function(filepath, quoteChar, indentString, htmlmin) {
    var content = utils.readFile(filepath)

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

  var counter = 0

  function compile(f, cb) {
    var moduleNames = []

    var modules = f.src.filter(existsFilter).map(function(filepath) {

      var moduleName = normalizePath(path.relative(options.base, filepath))
      if (utils.kindOf(options.rename) === 'function') {
        moduleName = options.rename(moduleName)
      }
      moduleNames.push("'" + moduleName + "'")
      if (options.target === 'js') {
        return compileTemplate(moduleName, filepath, options.quoteChar, options.indentString, options.useStrict, options.htmlmin)
      } else {
        gutil.log('Unknow target "' + options.target + '" specified')
      }
    })

    counter += modules.length
    modules = modules.join('\n')

    var fileHeader = options.fileHeaderString !== '' ? options.fileHeaderString + '\n' : ''
    var fileFooter = options.fileFooterString !== '' ? options.fileFooterString + '\n' : ''
    var bundle = ""
    var targetModule = f.module || options.module

    // If options.module is a function, use that to get the targetModule
    if (utils.kindOf(targetModule) === 'function') {
targetModule = targetModule(f)
    }
    //Allow a 'no targetModule if module is null' option
    if (targetModule) {
      bundle = "angular.module('" + targetModule + "', [" + moduleNames.join(', ') + "])"
      if (options.target === 'js') {
        bundle += ';'
      }

      bundle += "\n\n"
    }
    gutil.log(f.dest, utils.normalizelf(fileHeader + bundle + modules + fileFooter))
  }

  //Just have one output, so if we making thirty files it only does one line
  gutil.log("Successfully converted "+(""+counter).green +
                      " html templates to " + options.target + ".")

  return es.map(compile)
}
