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

var filenameToVar = function (p) {
    return p.replace(/[^a-zA-Z0-9_]+/g, '_');
};

// convert Windows file separator URL path separator
var normalizePath = function(p) {
  if(path.sep !== '/') {
    p = p.replace(/\\/g, '/')
  }
  return p
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
var compileNG = function(outputModuleName, moduleName, contents, quoteChar, indentString, useStrict, htmlmin) {

  var content = getContent(contents, quoteChar, indentString, htmlmin)
  var doubleIndent = indentString + indentString
  var strict = (useStrict) ? indentString + quoteChar + 'use strict' + quoteChar + ';\n' : ''

  var module = '(function(module) {\n' +
    'try { module = angular.module(' + quoteChar + outputModuleName + quoteChar + '); }\n' +
    'catch(err) { module = angular.module(' + quoteChar + outputModuleName + quoteChar + ', []); }\n' +
    'module.run([' + quoteChar + '$templateCache' + quoteChar + ', function($templateCache) ' +
    '{\n' + strict + indentString + '$templateCache.put(' + quoteChar + moduleName + quoteChar + ',\n' + doubleIndent  + quoteChar +  content +
     quoteChar + ');\n}]);\n' +
    '})();\n'

  return module
};
// compile a template to an object property
var compileJs = function(outputModuleName, moduleName, contents, quoteChar, indentString, useStrict, htmlmin) {
  var content = getContent(contents, quoteChar, indentString, htmlmin)
  var doubleIndent = indentString + indentString
  var strict = (useStrict) ? indentString + quoteChar + 'use strict' + quoteChar + ';\n' : ''

    return ' if(window['+ quoteChar +outputModuleName + quoteChar + '] === undefined){\n' +
    indentString + strict +
    indentString + 'window['+ quoteChar +outputModuleName + quoteChar + '] = {};\n}\n' +
    'window['+ quoteChar +outputModuleName + quoteChar + ']['+ quoteChar + moduleName + quoteChar +'] = ' + quoteChar +  content + quoteChar + ';\n';
};
// compile a template to typescript
var compileTs = function(outputModuleName, moduleName, contents, quoteChar, indentString, useStrict, htmlmin) {
  var content = getContent(contents, quoteChar, indentString, htmlmin);
  var module = 'export var ' + moduleName + ' = ' + quoteChar +  content + quoteChar + ';\n';
  if (outputModuleName !== '') {
      module = 'module ' + outputModuleName + ' {\n' + indentString + module + '}\n';
  }
  
  return '/* tslint:disable:max-line-length */\n' + module;
};

module.exports = function(file, options, callback) {

  options.base= options.base || '.'
  options.quoteChar= options.quoteChar || '"'
  options.indentString= options.indentString || '  '
  options.target= options.target || 'ng'
  options.htmlmin= options.htmlmin || {}
  options.useStrict= options.useStrict || false
  options.outputModuleName= options.outputModuleName || false;

  function getModule(filepath) {
    var moduleName;
    var outputModuleName;
    
    if (options.target === 'ts') {
      moduleName = filenameToVar(path.basename(filepath));
      outputModuleName = options.outputModuleName || '';
      
    } else {
      moduleName = normalizePath(path.relative(options.base, filepath))
      if (utils.kindOf(options.rename) === 'function') {
        moduleName = options.rename(moduleName)
      }
      outputModuleName = options.outputModuleName || moduleName;
    }

    if (options.target === 'ng') {
      return compileNG(outputModuleName, moduleName, file.contents.toString(), options.quoteChar, options.indentString, options.useStrict, options.htmlmin)
    }else if (options.target === 'js') {
      return compileJs(outputModuleName, moduleName, file.contents.toString(), options.quoteChar, options.indentString, options.useStrict, options.htmlmin)
    }else if (options.target === 'ts') {
      return compileTs(outputModuleName, moduleName, file.contents.toString(), options.quoteChar, options.indentString, options.useStrict, options.htmlmin)
    } else {
      gutil.log('Unknow target "' + options.target + '" specified')
    }

  }

  callback(null, getModule(file.path))
}
