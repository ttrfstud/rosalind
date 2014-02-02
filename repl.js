function listPrefixes(str) {
	var len = Math.floor(str.length / 2) + 1;

	var prefixes  = [];

	for (var i = len; i <= str.length; i++) {
		prefixes.push(str.substr(0, i));
	}

	return prefixes;
}

function endsWith(suff, str) {
	return str.substr(str.length - suff.length) === suff;
}

module.exports = function findFirst(dnas) {
	for (var i = 0; i < dnas.length; i++) {
		var prefixes = listPrefixes(dnas[i]);

		console.log(prefixes, 'of', dnas[i]);
		var foundGlobal = false;
		for (var j = 0; j < dnas.length; j++) {
			if(i !== j) {
				var found = false;
				console.log('\tdnas[j] = ', dnas[j]);

				for (var k = 0; k < prefixes.length; k++) {
					console.log('\tprefix', prefixes[k]);
					if (endsWith(prefixes[k], dnas[j])) {
						found = true;
						break;
					}
				}

				if (found) {
					foundGlobal = true;
					break;
				}
			}
		}

		if (foundGlobal) continue;
		else return i;
	}
}