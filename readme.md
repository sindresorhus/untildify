# untildify

> Convert a tilde path to an absolute path: `~/dev` → `/Users/sindresorhus/dev`

## Install

```sh
npm install untildify
```

## Usage

```js
import untildify from 'untildify';

untildify('~/dev');
//=> '/Users/sindresorhus/dev'
```

## Related

See [tildify](https://github.com/sindresorhus/tildify) for the inverse.
