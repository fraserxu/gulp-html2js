'use strict';

var through = require('through2');
var path = require('path');
var gutil = require('gulp-util');
var htmlToJs = require('./lib/compile');
var PluginError = gutil.PluginError;
var File = gutil.File;
const PLUGIN_NAME = 'gulp-html2js';

// file can be a vinyl file object or a string
// when a string it will construct a new one
module.exports = function (file, opt) {
    if (!file) {
        throw new PluginError(PLUGIN_NAME, 'Missing file option for gulp-html-to-js');
    }
    var opt = opt || {};
    opt.base = opt.base || '.'
    opt.quoteChar = opt.quoteChar || '"'
    opt.indentString = opt.indentString || '  '
    opt.target = opt.target || ''
    opt.htmlmin = opt.htmlmin || {}
    opt.useStrict = opt.useStrict || false
    opt.outputModuleName = opt.outputModuleName || false;
    opt.separator = gutil.linefeed;

    var _module,
        latestFile,
        latestMod;

    return through.obj(function (file, enc, cb) {
        // ignore empty files
        if (file.isNull()) {
            cb();
            return;
        }
        if (!latestMod || file.stat && file.stat.mtime > latestMod) {
            latestFile = file;
            latestMod = file.stat && file.stat.mtime;
        }

        // we don't do streams (yet)
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streaming not supported'));
            cb();
            return;
        }
        // construct concat instance
        if (!_module) {
            _module = new htmlToJs(opt);
        }
        // add file to concat instance
        _module.add(file.path, file.contents.toString());
        cb();
    }, function (cb) {
        // no files passed in, no file goes out
        if (!latestFile || !_module) {
            cb();
            return;
        }


        var joinedFile;

        // if file opt was a file path
        // clone everything from the latest file
        if (typeof file === 'string') {
            joinedFile = latestFile.clone({contents: false});
            joinedFile.path = path.join(latestFile.base, file);
        } else {
            joinedFile = new File(file);
        }

        joinedFile.contents = _module.content;
        this.push(joinedFile);
        cb();
    });
};