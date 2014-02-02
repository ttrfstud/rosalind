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
	
	var dna = d[0];
	var all4Mers = [];

	permutate(4, '', all4Mers)

	console.log(all4Mers);

	all4Mers.sort();

	var counts = [];

	for (var i = 0; i < all4Mers.length; i++) {
		var count = 0;
		for (var j = 0; j < dna.length - 3; j++) {
			if (all4Mers[i] === dna.substr(j, 4)) count++;
		}
		counts.push(count);
	}
	write(counts.join(' '));
});

function permutate(count, kmer, container) {
	if (!count) {
		container.push(kmer);
		return;
	}

	for (var i = 0; i < 4; i++) {
		permutate(count - 1, kmer + ['A', 'C', 'G', 'T'][i], container);
	}
}