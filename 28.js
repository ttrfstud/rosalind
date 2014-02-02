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


var codons = function (cb) {
	read0('rna-codon-table', {encoding: 'utf8'}, function (e, d) {
		d = d.replace(/\r/g, '');
		d = d.split('\n');

		var table = [];

		for (var i = 0; i < d.length; i++) {
			var c = d[i].split(' ')[0];
			var a = d[i].split(' ')[1];
			table[c.replace(/U/g, 'T')] = a;
		}

		cb(table);
	});
};

codons(function (table) {
	read(function (e, d) {

		d = parseFasta(d.replace(/\r/g, ''));
		
		var dna = d[0];
		var junk = d.slice(1);

		console.log('dna', dna);
		console.log('introns', junk);

		for (var i = 0; i < junk.length; i++) {
			dna = dna.split(junk[i]).join('');
		}

		var protein = '';
		for (var i = 0; i < dna.length; i += 3) {
			protein += table[dna.substr(i, 3)];
		}

		// console.log(dna);
		write(protein);
	});
});
