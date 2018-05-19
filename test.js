import test from 'ava';
import rewire from 'rewire';

const m = rewire('.');
const MOCK_HOME = 'MOCK_HOME';

// Mock out the home dir for more accurate and explicit tests
// eslint-disable-next-line ava/use-t
test.beforeEach(_ => m.__set__('home', MOCK_HOME));

test('operation with home dir', t => {
	t.not(m('~'), '~');
	t.not(m('~/dev'), '~/dev');
	t.regex(m('~/dev'), /\/dev/);
	t.is(m('~abc'), '~abc');
	t.true(expandsTildePrefixWithHome('~/'));
	t.true(expandsTildePrefixWithHome('~\\'));
	t.true(expandsTildePrefixWithHome('~/abc'));
	t.true(expandsTildePrefixWithHome('~\\abc'));
	t.true(expandsTildePrefixWithHome('~/abc/def'));
	t.true(expandsTildePrefixWithHome('~\\abc\\def'));
	t.true(expandsTildePrefixWithHome('~/abc\\def'));
	t.true(expandsTildePrefixWithHome('~\\abc/def'));
});

function expandsTildePrefixWithHome(tildePrefixedStr) {
	return m(tildePrefixedStr) === MOCK_HOME + tildePrefixedStr.slice(1);
}
