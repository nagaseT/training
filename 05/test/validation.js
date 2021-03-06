var Validation = require('./../public/validation');
var assert = require('assert');

describe('validation normal', function() {
  it('username: normal(min), password: normal(min)', function() {
    var params = {username: 'ab-_', password: 'aB-+!@'};
    var expect = [];
    var results = Validation.validation(params);
    assert.deepEqual(results, expect);
  });
  it('username: normal(max), password: normal(max)', function() {
    var params = {username: 'abcdefgh', password: 'aB#*&^%~'};
    var expect = [];
    var results = Validation.validation(params);
    assert.deepEqual(results, expect);
  });
});

describe('validation abnormal', function() {
  it('username: nothing, password: nothing', function() {
    var params = {username: '', password: ''};
    var expect = ['usernameを入力して下さい。', 'passwordを入力して下さい。'];
    var results = Validation.validation(params);
    assert.deepEqual(results, expect);
  });

  it('username: under min, password: normal', function() {
    var params = {username: 'abc', password: 'abcdef'};
    var expect = ['usernameは4文字以上8文字以下です。'];
    var results = Validation.validation(params);
    assert.deepEqual(results, expect);
  });
  it('username: normal, password: under min', function() {
    var params = {username: 'abcd', password: 'abcde'};
    var expect = ['passwordは6文字以上8文字以下です。'];
    var results = Validation.validation(params);
    assert.deepEqual(results, expect);
  });
  it('username: under min, password: under min', function() {
    var params = {username: 'abc', password: 'abcde'};
    var expect = ['usernameは4文字以上8文字以下です。', 'passwordは6文字以上8文字以下です。'];
    var results = Validation.validation(params);
    assert.deepEqual(results, expect);
  });
  it('username: over max, password: over max', function() {
    var params = {username: 'abcdefghi', password: 'abcdefghi'};
    var expect = ['usernameは4文字以上8文字以下です。', 'passwordは6文字以上8文字以下です。'];
    var results = Validation.validation(params);
    assert.deepEqual(results, expect);
  });

  it('username: unauthorized character, password: unauthorized character', function() {
    var params = {username: '?b-_', password: 'aB-+!?'};
    var expect = ['usernameに使用できるのは英小文字と - , _ のみです。', 'passwordに使用できるのは英大小字, -, +, !, @ , #, *, &, ^, %, ~ のみです。'];
    var results = Validation.validation(params);
    assert.deepEqual(results, expect);
  });
});

