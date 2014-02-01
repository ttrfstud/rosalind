var read0 = require('fs').readFile;
var read = require('fs').readFile.bind(null, 'data', {encoding: 'utf8'});
var write = require('fs').writeFileSync.bind(null, 'out');


function parseFasta(fasta, labels) {
	var strings = fasta.split('\n');

	var obj = {};
	var val = '';
	var label = '';

	var ar = [];
	for (var i = 0; i < strings.length; i++) {
		if (strings[i].charAt(0) === '>') {
			if (val && labels) obj[label] = val;
			else if (val && !labels) ar.push(val);
			val = '';
			label = strings[i];
		} else {
			val += strings[i];
		}
	}

	if (val && label && labels) {
		obj[label] = val;
	} else if (val && label && !labels) {
		ar.push(val);
	}

	return labels && obj || ar;
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
		d = d.replace(/\r/g, '');

		var dna = parseFasta(d)[0];

		var protein = '';
		var cprotein = '';
		var proteins = [];
		var cdna = complement(dna).split('').reverse().join('');

		console.log(dna, 'dna');
		console.log(cdna, 'cdna');
		
		var proteins = [];

		function proteinsIn(dna) {
			var protein, proteins = [], flag;

			for (var offset = 0; offset < 3; offset++) {
				protein = '';
				flag = false;
				for (var i = offset; i < dna.length; i+=3) {
					var codon = dna.substr(i, 3);

					if (codon.length !== 3) {
						break;
					}
					if (!table[codon]) {
						flag && protein && proteins.push(protein);
						protein = '';
						if(flag) i = flag;
						flag = false;
						// console.log('stop', codon, i);
					} else if (codon === 'ATG' && !flag) {
						// console.log('start', codon, i);
						protein = table[codon];
						flag = i;
					} else {
						protein += table[codon];
					}
				}
			}

			return proteins;
		}

		proteins = proteins.concat(proteinsIn(dna));
		proteins = proteins.concat(proteinsIn(cdna));

		var noDups = [];

		for (var i = 0; i < proteins.length; i++) {
			if (noDups.indexOf(proteins[i]) === -1) {
				noDups.push(proteins[i]);
			}
		}
		write(noDups.join('\n'));
	}); 	
});


function complement(dna) {
	return dna.replace(/A/g, '1').replace(/C/g, '2').replace(/G/g, '3').
	replace(/T/g, '4').replace(/1/g, 'T').replace(/2/g, 'G').replace(/3/g, 'C').
	replace(/4/g, 'A');
}
