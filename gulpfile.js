var gulp        = require('gulp'),
    listfiles   = require('./index'),
    nodeunit    = require('gulp-nodeunit');

var options = {
    filename: 'output.txt',
    banner: '/**\n' +
    ' * list files banner\n' +
    ' */\n' +
    '{\n' +
    '\t[',
    footer: '\t]\n' +
    '}',
    eol: 'lf',
    prefix: '\t\t\'',
    postfix: '\',',
    postfixLastLine: '\'',
    replacements: [
        {
            pattern: /\.min/gi,
            replacement: ''
        },
        {
            pattern: /(file)(_)([\S]*?)(_)(test)/gi,
            replacement: function (match, p1, p2, p3, p4, p5, offset, string) {
                return [p1, p3, p5].join('-');
            }
        }]
};

gulp.task('listfiles', function () {
    return gulp.src([
        'test/fixtures/**/*.*',
        '!test/fixtures/{,*/,**/}*.{scss,html,md,rb}',
        '!test/fixtures/{,*/,**/}LICENSE'
    ], { read: false, base: './' })
        .pipe(listfiles(options))
        .pipe(gulp.dest('tmp/'));
});

gulp.task('test', function () {
    gulp.src('test/*_test.js')
        .pipe(nodeunit());
});