'use strict';
var test = require('ava');
var untildify = require('./');

test(function (t) {
	var fixture = '~/dev';
	t.assert(/\/dev/.test(untildify(fixture)));
	t.assert(untildify(fixture) !== fixture);
});
