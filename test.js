import test from 'ava';
import fn from './';

test(t => {
	t.true(fn('~/dev') !== '~/dev');
	t.true(/\/dev/.test(fn('~/dev')));
	t.true(!/^~$/.test(fn('~')));
	t.true(/^~abc$/.test(fn('~abc')));
	t.true(/.+\/$/.test(fn('~/')));
	t.true(/.+\\$/.test(fn('~\\')));
	t.true(/.+\/abc$/.test(fn('~/abc')));
	t.true(/.+\\abc$/.test(fn('~\\abc')));
	t.true(/.+\/abc\/def$/.test(fn('~/abc/def')));
	t.true(/.+\\abc\\def$/.test(fn('~\\abc\\def')));
	t.true(/.+\/abc\\def$/.test(fn('~/abc\\def')));
	t.true(/.+\\abc\/def$/.test(fn('~\\abc/def')));
});
