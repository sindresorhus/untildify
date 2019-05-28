import test from 'ava';
import esmock from 'esmock';

const MOCK_HOME = 'MOCK_HOME';

const create = async homeDirectory => esmock('./index.js', {
	os: {
		homedir: () => homeDirectory,
	},
});

const untildify = await create(MOCK_HOME);

const expandsTildePrefixWithHome = path => untildify(path) === MOCK_HOME + path.slice(1);

test('operation with home directory', t => {
	t.not(untildify('~'), '~');
	t.not(untildify('~/dev'), '~/dev');
	t.regex(untildify('~/dev'), /\/dev/);
	t.true(expandsTildePrefixWithHome('~/'));
	t.true(expandsTildePrefixWithHome('~\\'));
	t.true(expandsTildePrefixWithHome('~/abc'));
	t.true(expandsTildePrefixWithHome('~\\abc'));
	t.true(expandsTildePrefixWithHome('~/abc/def'));
	t.true(expandsTildePrefixWithHome('~\\abc\\def'));
	t.true(expandsTildePrefixWithHome('~/abc\\def'));
	t.true(expandsTildePrefixWithHome('~\\abc/def'));
});

test('operation without home directory', async t => {
	const untildify = await create(undefined);
	t.is(untildify('~'), '~');
	t.is(untildify('foo'), 'foo');
	t.is(untildify('~abc'), '~abc');
	t.is(untildify('~/dev'), '~/dev');
});

test('paths where ~ is not current user\'s home directory', t => {
	t.is(untildify('~abc'), '~abc');
	t.is(untildify('/~/'), '/~/');
	t.is(untildify('/~'), '/~');
	t.is(untildify('abc~'), 'abc~');
	t.true(expandsTildePrefixWithHome('~/abc~'));
});

test('paths with regex replacement patterns', t => {
	t.is(untildify('~$&'), '~$&');
	t.is(untildify('~$1'), '~$1');
	t.true(expandsTildePrefixWithHome('~/$1'));
	t.true(expandsTildePrefixWithHome('~/$&'));
});
