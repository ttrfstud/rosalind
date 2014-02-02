var read = require('fs').readFile.bind(null, 'data', {encoding: 'utf8'});
var write = require('fs').writeFileSync.bind(null, 'out');

var SUN_SHINES = true;

function parseFasta(fasta) {
	var strings = fasta.split('\n');

	var obj = [];
	var val = '';

	for (var i = 0; i < strings.length; i++) {
		if (strings[i].charAt(0) === '>') {
			if (val) obj.push(val);
			val = '';
		} else {
			val += strings[i];
		}
	}

	if (val) {
		obj.push(val);
	}

	return obj;
}

read(function (e, d) {

	d =d.replace(/\r/g, '');
	var dnas = parseFasta(d);

	// console.log(dnas);

	var i = findFirst(dnas);
	var path = dnas[i];

	console.log('first is', path);
	dnas.splice(i, 1);

	while (SUN_SHINES) {
		if (!dnas.length) break;
		var max = findMaxPrefix(path, dnas);

		var prefix = max.prefix;
		var length = max.length;

		path += prefix.substr(length);
		dnas.splice(dnas.indexOf(max.prefix), 1);
	}

	write(path);
});

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

function findFirst(dnas) {
	// console.log(dnas);
	for (var i = 0; i < dnas.length; i++) {
		var prefixes = listPrefixes(dnas[i]);

		// console.log(prefixes, 'of', dnas[i]);
		var foundGlobal = false;
		for (var j = 0; j < dnas.length; j++) {
			if(i !== j) {
				var found = false;
				// console.log('\tdnas[j] = ', dnas[j]);

				for (var k = 0; k < prefixes.length; k++) {
					// console.log('\tprefix', prefixes[k]);
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

function findMaxPrefix(str, coll) {

	// console.log('\t looking for prefix of ', str);

	var maxLen = 0;
	var max = '';
	for (var i = 0; i < coll.length; i++) {
		var item = coll[i];
		var minLen = Math.floor(item.length / 2) + 1;

		// console.log('\t\tconsidering item', item);
		for (var j = minLen; j < item.length; j++) {
			var pref = item.substr(0, j);
			var suff = str.substr(str.length - j);
			// console.log('\t\t\tsuff is', suff, 'pref is', pref, '==', suff === pref);
			if (suff === pref  &&
				j > maxLen) {

				// console.log('\t\t\t\titem', item, 'has prefix', pref);
				maxLen = j;
				max = item;
			}
		}
	}

	var rsult = {}

	if (!max) {
		throw new Error(str, len);;
		return rsult;
	}

	// console.log('\t>>found prefix', max.substr(0, maxLen));
	rsult.prefix = max;
	rsult.length = maxLen;

	return rsult;
}