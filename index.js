'use strict';
const os = require('os');

const home = os.homedir();

module.exports = pathWithTilde => {
	if (typeof pathWithTilde !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof pathWithTilde}`);
	}

	return home ? pathWithTilde.replace(/^~(?=$|\/|\\)/, home) : pathWithTilde;
};
