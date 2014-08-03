'use strict';
var test = require('ava');
var untildify = require('./');

test(function (t) {
	process.env.HOME = '/Users/sindresorhus';
	t.assert(untildify('~/dev') === '/Users/sindresorhus/dev');
});
