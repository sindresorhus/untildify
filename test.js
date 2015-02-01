'use strict';
var test = require('ava');
var untildify = require('./');

test(function (t) {
	var fixture = '~/dev';
	t.assert(/\/dev/.test(untildify(fixture)));
	t.assert(untildify(fixture) !== fixture);
	t.assert(!/^~$/.test(untildify('~')));
	t.assert(/^~abc$/.test(untildify('~abc')));
	t.assert(/.+\/$/.test(untildify('~/')));
	t.assert(/.+\\$/.test(untildify('~\\')));
	t.assert(/.+\/abc$/.test(untildify('~/abc')));
	t.assert(/.+\\abc$/.test(untildify('~\\abc')));
});
