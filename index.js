'use strict';
const os = require('os');

const home = os.homedir();

module.exports = str => {
	if (typeof str !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof str}`);
	}

	/* Don't replace if tilde not followed by path delimiter or regex variable. */
	if (/^~[^$$|\\|/]/.test(str)) {
		return str;
	}

	/* If valid, swap tilde. */
	return str.replace(/^~/, `${home}`);
};
