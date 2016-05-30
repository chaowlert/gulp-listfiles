# gulp-listfiles [![NPM version](https://badge.fury.io/js/gulp-listfiles.png)](http://badge.fury.io/js/gulp-listfiles) [![Build Status](https://travis-ci.org/chaowlert/gulp-listfiles.png?branch=master)](https://travis-ci.org/chaowlert/gulp-listfiles)

> Create a list of files and perform an action on each file in the list then write the results to a file.


## Getting Started
This plugin is a gulp version of [grunt-listfiles](https://github.com/psyrendust/grunt-listfiles).

If you haven't used [Gulp](http://gulpjs.com/) before, be sure to check out the [Getting Started](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) guide, as it explains how to create a Gulpfile as well as install and use Gulp plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install gulp-listfiles --save-dev
```

### Options

#### filename
Type: `String`  
Default: `unnamed.txt`

Destination filename.

#### banner
Type: `String`  
Default: `null`

Prefix the destination file with the given banner, with a linebreak inbetween.

#### footer
Type: `String`  
Default: `null`

Postfix the destination file with the given footer, with a prepended linebreak.

#### eol
Type: `String`  
Choices: `'lf'`, `'cr'`, `'crlf'`  
Default: `'lf'`

The linefeed character you would like to use for the destination file.

#### prefix
Type: `String`  
Default: `null`

A prefix string to prepend to each file that is found.

#### postfix
Type: `String`  
Default: `null`

A postfix string to append to each file that is found.

#### postfixLastLine
Type: `String`  
Default: `null`

A postfix string to append to the last file that is found.


#### replacements
Type: `Array`  
Default: `[]`

This option will hold all your pattern/replacement pairs. A pattern/replacement pair should contain key:value pairs containing:

* pattern `String` or `Regex`
* replacement `String` or `Function`

```javascript
var listfiles = require('gulp-listfiles');

var options = {
  filename: 'output.txt',
  replacements: [{
    pattern: /\/(asdf|qwer)\//ig,
    replacement: '"$1"'
  }, {
    pattern: ',',
    replacement: ';'
  }, {
    pattern: /(file)(_)([\S]*?)(_)(test)/gi,
    replacement: function (match, p1, p2, p3, p4, p5, offset, string) {
      return [p1, p3, p5].join('-');
    }
  }]
};

gulp.task('listfiles', function () {
  return gulp.src(['src/**/*.js'], {read: false})
             .pipe(listfiles(options))
             .pipe(gulp.dest('tmp'));
```

###### Note

If specifying a function as a parameter for the replacemnt please see the documentation at [https://developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) for more details.
If the pattern is a string, only the first occurrence will be replaced, as stated on [String.prototype.replace](http://www.ecma-international.org/ecma-262/5.1/#sec-15.5.4.11).

### Usage Examples

#### Example Config

```javascript
var listfiles = require('gulp-listfiles');

var options = {
  filename: 'output.txt',
  banner: '/**\n' +
          ' * list files banner\n' +
          ' */\n' +
          '{\n' +
          '\t[',
  footer: '\t]\n' +
          '}',
  eol: 'crlf',
  prefix: '\t\t\'',
  postfix: '\',',
  postfixLastLine: '\''
};

gulp.task('listfiles', function () {
  return gulp.src(['src/**/*.js'], {read: false})
             .pipe(listfiles(options))
             .pipe(gulp.dest('tmp/'));
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Gulp](http://gulpjs.com/).

## Release History
 * 2016-05-30   v0.1.0   Initial release.
