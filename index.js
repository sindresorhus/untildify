'use strict';
const os = require('os');
const isWindows = require('is-windows');

const home = (() => {
	const homeDir = os.homedir();
	if (isWindows()) {
		// Return the home directory with the user name part in 8.3 format
		// (https://goo.gl/FxW2CB) if needed. This is a workaround for
		// https://github.com/nodejs/node/issues/17586.
		const tmpDir = os.tmpdir();
		const userDir = homeDir.replace(/([^\\])+$/g, '');
		const user83 = tmpDir.slice(userDir.length).replace(/\\.*$/, '');
		return `${userDir}${user83}`;
	}
	return homeDir;
})();

module.exports = str => {
	if (typeof str !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof str}`);
	}

	return home ? str.replace(/^~($|\/|\\)/, `${home}$1`) : str;
};
