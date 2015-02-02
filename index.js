'use strict';
var userHome = require('user-home');

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return userHome ? str.replace(/^~($|\/|\\)/, userHome + '$1') : str;
};
