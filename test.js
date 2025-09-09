import os from 'node:os';
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
	t.true(expandsTildePrefixWithHome(String.raw`~\abc`));
	t.true(expandsTildePrefixWithHome('~/abc/def'));
	t.true(expandsTildePrefixWithHome(String.raw`~\abc\def`));
	t.true(expandsTildePrefixWithHome(String.raw`~/abc\def`));
	t.true(expandsTildePrefixWithHome(String.raw`~\abc/def`));
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

// Tests for ~user expansion
test('~user expansion for current user', async t => {
	// Use the actual untildify function without mocking for this test
	const {default: realUntildify} = await import('./index.js');
	const currentUser = os.userInfo().username;
	const currentHome = os.homedir();

	// ~currentuser should expand to current user's home
	t.is(realUntildify(`~${currentUser}`), currentHome);
	t.is(realUntildify(`~${currentUser}/`), `${currentHome}/`);
	t.is(realUntildify(`~${currentUser}/dev`), `${currentHome}/dev`);
});

test('~user expansion for other users', async t => {
	// Use the actual untildify function without mocking for this test
	const {default: realUntildify} = await import('./index.js');

	// Other users should return unchanged (simplified implementation)
	t.is(realUntildify('~root'), '~root');
	t.is(realUntildify('~root/'), '~root/');
	t.is(realUntildify('~otheruser/test'), '~otheruser/test');
});

test('~user expansion for non-existent users', async t => {
	// Use the actual untildify function without mocking for this test
	const {default: realUntildify} = await import('./index.js');

	// Non-existent users should return unchanged
	t.is(realUntildify('~nonexistentuser123'), '~nonexistentuser123');
	t.is(realUntildify('~nonexistentuser123/'), '~nonexistentuser123/');
	t.is(realUntildify('~nonexistentuser123/dev'), '~nonexistentuser123/dev');
});

test('~user expansion edge cases', async t => {
	// Use the actual untildify function without mocking for this test
	const {default: realUntildify} = await import('./index.js');

	// Should not expand if not at the beginning
	t.is(realUntildify('foo~bar'), 'foo~bar');
	t.is(realUntildify('/~user'), '/~user');
	t.is(realUntildify('abc~def/ghi'), 'abc~def/ghi');

	// Empty username after ~ (just ~ alone should still work)
	t.is(realUntildify('~'), os.homedir());

	// Username containing special characters that don't typically appear in usernames
	t.is(realUntildify('~user!!invalid'), '~user!!invalid');
	t.is(realUntildify('~user@host'), '~user@host');
});
