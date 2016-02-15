var path = require('path')
var NGAdapter = require('./adapters/angular')
var JSAdapter = require('./adapters/javascript')

var normalizePath = function (p) {
    return path.sep !== '/' ? p.replace(/\\/g, '/') : p;
}

function html2js(opt) {
    this.opt = opt || {};
    this.opt.base = this.opt.base || './';
    this.adapter;
    this.contentParts = [];
    this.separator = new Buffer(opt.separator || ',');
    this.getAdapter();
}
html2js.prototype.add = function (filePath, content) {
    filePath = filePath && normalizePath(filePath);

    var filePath = normalizePath(path.relative(this.opt.base, filePath))

    if (typeof this.opt.rename === 'function') {
        filePath = this.opt.rename(filePath)
    }

    if (this.contentParts.length) {
        this.contentParts.push(this.separator);
    }

    this.contentParts.push(new Buffer(this.adapter.getFile(filePath, content)));
};
html2js.prototype.getAdapter = function () {

    if (this.adapter) return this.adapter;

    switch (this.opt.adapter) {
        case 'angular':
        default:
            this.adapter = new NGAdapter(this.opt);
            break;
        case 'javascript':
            this.adapter = new JSAdapter(this.opt);
            break;
    }
    this.contentParts = [new Buffer(this.adapter.getHeader())];
    return this.adapter;
}

Object.defineProperty(html2js.prototype, 'content', {
    get: function () {
        this.contentParts.push(new Buffer(this.adapter.getFooter()));
        return Buffer.concat(this.contentParts);
    }
});
module.exports = html2js;