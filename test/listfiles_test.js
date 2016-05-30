/*jshint globalstrict: true*/
'use strict';

var fs = require('fs');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.test = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  test1: function (test) {
    test.expect(1);
    var actual = fs.readFileSync('tmp/output.txt', 'utf-8');
    var expected = fs.readFileSync('test/expected/expected.txt', 'utf-8').replace(/\r\n/g, '\n');
    
    test.equal(String(actual), String(expected), 'output.txt should match expected.txt');
    test.done();
  }
};
