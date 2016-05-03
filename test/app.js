'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-prismatic-injector:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
          name: 'foo',
          description: 'foo',
          username: 'foo',
          nickname: 'foo',
          email: 'foo'
      })
      .on('end', done);
  });

  it('creates files', function () {
    var expected = [
      '.gitignore',
      'README.md',
      'LICENSE',
      'package.json',
      'gulpfile.js',
      'server.js',
      'src/stub/foo-query.json',
      'src/templates/template.json',
      'src/templates/js/entry.js',
      'src/templates/css/style.css'
    ];

    assert.file(expected);
  });
});
