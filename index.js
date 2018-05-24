'use strict';
const os = require('os');

const home = os.homedir();

module.exports = input => {
	if (typeof input !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof input}`);
	}

	return home ? input.replace(/^~(?=$|\/|\\)/, home) : input;
};
