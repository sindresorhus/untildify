'use strict';
var test = require('ava');
var untildify = require('./');

test(function (t) {
	var fixture = '~/dev';
	t.assert(/\/dev/.test(untildify(fixture)));
	t.assert(untildify(fixture) !== fixture);
});

test(function (t) {
	t.assert(!/^~$/.test(untildify('~')));
});

test(function (t) {
	t.assert(/^~abc$/.test(untildify('~abc')));
});

test(function (t) {
	t.assert(/.+\/$/.test(untildify('~/')));
});

test(function (t) {
	t.assert(/.+\\$/.test(untildify('~\\')));
});

test(function (t) {
	t.assert(/.+\/abc$/.test(untildify('~/abc')));
});

test(function (t) {
	t.assert(/.+\\abc$/.test(untildify('~\\abc')));
});

test(function (t) {
	t.assert(/.+\/abc\/def$/.test(untildify('~/abc/def')));
});

test(function (t) {
	t.assert(/.+\\abc\\def$/.test(untildify('~\\abc\\def')));
});

test(function (t) {
	t.assert(/.+\/abc\\def$/.test(untildify('~/abc\\def')));
});

test(function (t) {
	t.assert(/.+\\abc\/def$/.test(untildify('~\\abc/def')));
});
