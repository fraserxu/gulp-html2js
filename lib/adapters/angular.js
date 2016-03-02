'use strict';
function NGAdapter(opt) {
    this.opt = opt || {};
    this.opt.name = opt.name || '_html_';
    this.contentParts = [];
    this.separator = new Buffer(opt.separator);
};

NGAdapter.prototype.getHeader = function () {
    return '//HEAD ' + "\n" +
        '(function(app) {' + "\n" +
        'try { app = angular.module("' + this.opt.name + '"); }' + "\n" +
        'catch(err) { app = angular.module("' + this.opt.name + '", []); }' + "\n" +
        'app.run(["$templateCache", function($templateCache) {' + "\n" +
        '"use strict";' + "\n";
};

NGAdapter.prototype.getFile = function (file, content) {
    return '$templateCache.put("' + file + '","' + this.escapeContent(content) + '")' + "\n";
};

NGAdapter.prototype.getFooter = function () {
    return '}]);' + "\n" + '})();';
};
NGAdapter.prototype.escapeContent = function (content) {
    var quoteChar = '"';
    var indentString = "  ";
    var bsRegexp = new RegExp('\\\\', 'g');
    var quoteRegexp = new RegExp('\\' + quoteChar, 'g');
    var nlReplace = '\\n' + quoteChar + ' +\n' + indentString + indentString + quoteChar;
    return content.replace(bsRegexp, '\\\\').replace(quoteRegexp, '\\' + quoteChar).replace(/\r?\n/g, nlReplace);
}
module.exports = NGAdapter;
