'use strict';
var semver = require('semver');

module.exports = function (version, type) {
	if (['major', 'minor', 'patch'].indexOf(type) === -1) {
		throw new TypeError('Invalid version type');
	}

	version = semver.parse(version);

	version.build = '';
	version.prerelease = '';

	if (type === 'minor') {
		version.patch = 0;
	}

	if (type === 'major') {
		version.patch = 0;
		version.minor = 0;
	}

	return version.format();
};
