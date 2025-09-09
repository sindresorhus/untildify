/**
Convert a tilde path to an absolute path: `~/dev` → `/Users/sindresorhus/dev`.

Also expands `~username` when the username matches the current user.

@example
```
import untildify from 'untildify';

untildify('~/dev');
//=> '/Users/sindresorhus/dev'

// If current user is 'sindresorhus'
untildify('~sindresorhus/dev');
//=> '/Users/sindresorhus/dev'
```
*/
export default function untildify(pathWithTilde: string): string;
