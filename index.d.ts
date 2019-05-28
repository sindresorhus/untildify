/**
Convert a tilde path to an absolute path: `~/dev` → `/Users/sindresorhus/dev`.

@example
```
import untildify from 'untildify';

untildify('~/dev');
//=> '/Users/sindresorhus/dev'
```
*/
export default function untildify(pathWithTilde: string): string;
