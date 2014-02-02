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
	var sseq = d[1];

	var indices = [];

	for (var i = 0; i < dna.length; i++) {
		if (!sseq.length) break;

		if (dna[i] === sseq[0]) {
			indices.push(i + 1);
			sseq = sseq.substr(1);
		}
	}
	write(indices.join(' '));
});