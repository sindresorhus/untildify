'use strict';
const os = require('os');
const path = require('path');

const homeDirectory = os.homedir();

module.exports = pathWithTilde => {
	if (typeof pathWithTilde !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof pathWithTilde}`);
	}

	return homeDirectory ? path.normalize(pathWithTilde.replace(/^~(?=$|\/|\\)/, homeDirectory)) : pathWithTilde;
};
