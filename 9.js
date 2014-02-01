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

	var dna1 = d.split('\n')[0];
	var dna2 = d.split('\n')[1];

	var c = 0;

	for (var i = 0; i < dna1.length; i++) {
		if (dna1[i] !== dna2[i]) c++;
	}

	write(c);
}); 	