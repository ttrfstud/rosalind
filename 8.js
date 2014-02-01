var read = require('fs').readFile.bind(null, 'data', {encoding: 'utf8'});
var write = require('fs').writeFileSync.bind(null, 'out');

function parseFasta(fasta) {
	var strings = fasta.split('\n');

	var obj = {};
	var val = '';
	var label = '';

	for (var i = 0; i < strings.length; i++) {
		if (strings[i].charAt(0) === '>') {
			if (val) obj[label] = val;
			val = '';
			label = strings[i];
		} else {
			val += strings[i];
		}
	}

	return obj;
}

read(function (e, d) {
	d = d.replace(/\r/g, '');

	var dna = d.split('\n')[0];
	var subdna = d.split('\n')[1];

	var indices = [];

	for (var i = 0; i < dna.length; i++) {
		if (dna.substr(i).substr(0, subdna.length) === subdna) {
			indices.push(i + 1);
		}
	}

	write(indices.join(' '));
}); 	