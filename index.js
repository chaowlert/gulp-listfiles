"use strict";

var through = require('through'),
    util = require('gulp-util'),
    path = require('path'),
    slash = require('slash');

function listfiles(options) {
    options = options || {};

    var filename = options.filename || 'unnamed.txt';
    var cwd = process.cwd();
    var contents = [];
    var lineBreak = getLineBreak(options.eol);
    var replacements = options.replacements || [];
    var prefix = options.prefix || '';
    var postfix = options.postfix || '';
    var postfixLastLine = options.postfixLastLine || postfix;

    function getLineBreak(eol) {
        switch (eol) {
            case 'cr': return '\r';
            case 'crlf': return '\r\n';
            default: return '\n';
        }
    }

    function writeFile(file) {
        var filepath = slash(file.relative);
        contents.push(replace(filepath));
    }
    
    function replace(filepath) {
        return replacements.reduce(function (filepath, replacement) {
            return filepath.replace(replacement.pattern, replacement.replacement);
        }, filepath);
    }

    function endStream() {
        if (prefix || postfix || postfixLastLine) {
            for (var i = 0; i < contents.length - 1; i++) {
                contents[i] = prefix + contents[i] + postfix;
            }
            if (contents.length) {
                contents[contents.length - 1] = prefix + contents[contents.length - 1] + postfixLastLine;
            }
        }

        if (options.banner) {
            contents.unshift(options.banner);
        }
        
        if (options.footer) {
            contents.push(options.footer);
        }

        var file = new util.File({
            cwd: cwd,
            base: cwd,
            path: path.join(cwd, filename),
            contents: new Buffer(contents.join(lineBreak))
        });

        this.emit('data', file);
        this.emit('end');
    }

    return through(writeFile, endStream);
}

module.exports = listfiles;
