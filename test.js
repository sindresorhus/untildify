import test from 'ava';
import rewire from 'rewire';

const m = rewire('.');
const MOCK_HOME = 'MOCK_HOME';

const expandsTildePrefixWithHome = path => m(path) === MOCK_HOME + path.slice(1);

// Mock out the home directory for more accurate and explicit tests
// eslint-disable-next-line ava/use-t
test.beforeEach(() => m.__set__('home', MOCK_HOME));

test('operation with home directory', t => {
	t.not(m('~'), '~');
	t.not(m('~/dev'), '~/dev');
	t.regex(m('~/dev'), /\/dev/);
	t.true(expandsTildePrefixWithHome('~/'));
	t.true(expandsTildePrefixWithHome('~\\'));
	t.true(expandsTildePrefixWithHome('~/abc'));
	t.true(expandsTildePrefixWithHome('~\\abc'));
	t.true(expandsTildePrefixWithHome('~/abc/def'));
	t.true(expandsTildePrefixWithHome('~\\abc\\def'));
	t.true(expandsTildePrefixWithHome('~/abc\\def'));
	t.true(expandsTildePrefixWithHome('~\\abc/def'));
});

test('operation without home directory', t => {
	m.__set__('home', undefined);
	t.is(m('~'), '~');
	t.is(m('foo'), 'foo');
	t.is(m('~abc'), '~abc');
	t.is(m('~/dev'), '~/dev');
});

test('paths where ~ is not current user\'s home directory', t => {
	t.is(m('~abc'), '~abc');
	t.is(m('/~/'), '/~/');
	t.is(m('/~'), '/~');
	t.is(m('abc~'), 'abc~');
	t.true(expandsTildePrefixWithHome('~/abc~'));
});

test('paths with regex replacement patterns', t => {
	t.is(m('~$&'), '~$&');
	t.is(m('~$1'), '~$1');
	t.true(expandsTildePrefixWithHome('~/$1'));
	t.true(expandsTildePrefixWithHome('~/$&'));
});
