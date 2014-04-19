# untildify [![Build Status](https://travis-ci.org/sindresorhus/untildify.svg?branch=master)](https://travis-ci.org/sindresorhus/untildify)

> Convert a tilde path to an absolute path: `~/dev` => `/Users/sindresorhus/dev`

See the [tildify](https://github.com/sindresorhus/tildify) module for the inverse.


## Install

```bash
$ npm install --save untildify
```


## Usage

```js
var untildify = require('untildify');

untildify('~/dev');
//=> /Users/sindresorhus/dev
```


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
