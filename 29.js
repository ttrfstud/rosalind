var read0 = require('fs').readFile;
var read = require('fs').readFile.bind(null, 'data', {encoding: 'utf8'});
var write = require('fs').writeFileSync.bind(null, 'out');

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

	d = parseFasta(d.replace(/\r/g, ''));
	
	var dna1 = d[0];
	var dna2 = d[1];

	var transitions = 0;
	var transversions = 0;
	for (var i = 0; i < dna1.length; i++) {
		if (dna1[i] !== dna2[i]) {
			if (dna1[i] + dna2[i] === 'AG' || 
				dna1[i] + dna2[i] === 'GA' ||
				dna1[i] + dna2[i] === 'CT' ||
				dna1[i] + dna2[i] === 'TC') {
				transitions++;
			} else {
				transversions++;
			}
		}
	}

	write(transitions / transversions);
});