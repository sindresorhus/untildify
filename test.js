'use strict';
var assert = require('assert');
var untildify = require('./index');

it('should convert tilde path to absolute path', function () {
	process.env.HOME = '/Users/sindresorhus';
	assert.equal(untildify('~/dev'), '/Users/sindresorhus/dev');
});
