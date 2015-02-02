'use strict';
var test = require('ava');
var untildify = require('./');

test(function (t) {
	t.assert(untildify('~/dev') !== '~/dev');
	t.assert(/\/dev/.test(untildify('~/dev')));
	t.assert(!/^~$/.test(untildify('~')));
	t.assert(/^~abc$/.test(untildify('~abc')));
	t.assert(/.+\/$/.test(untildify('~/')));
	t.assert(/.+\\$/.test(untildify('~\\')));
	t.assert(/.+\/abc$/.test(untildify('~/abc')));
	t.assert(/.+\\abc$/.test(untildify('~\\abc')));
	t.assert(/.+\/abc\/def$/.test(untildify('~/abc/def')));
	t.assert(/.+\\abc\\def$/.test(untildify('~\\abc\\def')));
	t.assert(/.+\/abc\\def$/.test(untildify('~/abc\\def')));
	t.assert(/.+\\abc\/def$/.test(untildify('~\\abc/def')));
	t.end();
});
