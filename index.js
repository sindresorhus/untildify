import os from 'node:os';

let homeDirectory;
let currentUser;

export default function untildify(pathWithTilde) {
	if (typeof pathWithTilde !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof pathWithTilde}`);
	}

	if (homeDirectory === undefined) {
		homeDirectory = os.homedir();
	}

	// Handle regular ~ expansion (current user)
	if (homeDirectory && /^~(?=$|\/|\\)/.test(pathWithTilde)) {
		return pathWithTilde.replace(/^~/, homeDirectory);
	}

	// Handle ~username expansion (only for current user)
	const userMatch = pathWithTilde.match(/^~([^/\\]+)(.*)/);
	if (userMatch) {
		if (currentUser === undefined) {
			currentUser = os.userInfo().username;
		}

		if (currentUser) {
			const username = userMatch[1];
			const rest = userMatch[2];
			if (username === currentUser) {
				return homeDirectory + rest;
			}
		}
	}

	// Return unchanged if no expansion occurred
	return pathWithTilde;
}
