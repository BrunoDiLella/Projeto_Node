var assert = require('assert');
var muder = require('../');
var functions = require('../src/functions');

var example1 = require('./example1');
var example2 = require('./example2');

describe('example1', function () {
  it('muder', function () {
    var r = muder(example1.source, example1.mapper, {
        hello: function (name) {
          return 'hello '+name;
        }
    });
    assert.deepEqual(r, example1.result);
  });
});

describe('example2', function () {
  it('muder', function () {
    var r = muder(example2.source, example2.mapper);
    assert.deepEqual(r, example2.result);
  });
  describe('muder functions', function () {
    it ('_dig', function () {
      var r = functions._dig(example2.source, example2.mapper.workmatesName[0]);
      assert.deepEqual(r, example2.result.workmatesName);
    });
  });


});
