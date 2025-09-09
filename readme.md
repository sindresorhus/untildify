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

// Assuming the current user is 'sindresorhus'
untildify('~sindresorhus/dev');
//=> '/Users/sindresorhus/dev'
```

## Features

- Expands `~` to the current user's home directory
- Expands `~username` to the home directory when username matches the current user
- Returns path unchanged if username doesn't match the current user

## Related

See [tildify](https://github.com/sindresorhus/tildify) for the inverse.
