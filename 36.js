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
	var rna = parseFasta(d.replace(/\r/g, ''))[0];

	var as = 0, cs = 0;
	for (var i = 0; i < rna.length; i++) {
		if (rna[i] === 'A') as++;
		if (rna[i] === 'C') cs++;
	}

	write(fact(as) * fact(cs));
});

function fact(n) {
	var f = 1;

	for (var i = 1; i < n + 1; i++) {
		f *= i;
	}

	return f;
}