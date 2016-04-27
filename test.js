import test from 'ava';
import m from './';

test(t => {
	t.true(m('~/dev') !== '~/dev');
	t.true(/\/dev/.test(m('~/dev')));
	t.true(!/^~$/.test(m('~')));
	t.true(/^~abc$/.test(m('~abc')));
	t.true(/.+\/$/.test(m('~/')));
	t.true(/.+\\$/.test(m('~\\')));
	t.true(/.+\/abc$/.test(m('~/abc')));
	t.true(/.+\\abc$/.test(m('~\\abc')));
	t.true(/.+\/abc\/def$/.test(m('~/abc/def')));
	t.true(/.+\\abc\\def$/.test(m('~\\abc\\def')));
	t.true(/.+\/abc\\def$/.test(m('~/abc\\def')));
	t.true(/.+\\abc\/def$/.test(m('~\\abc/def')));
});
