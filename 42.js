var read0 = require('fs').readFile;
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

	if (val && label) {
		obj[label] = val;
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
			table[c] = a;
		}

		cb(table);
	});
};

var mmt = function (cb) {
	read0('monoisotopic-mass-table', {encoding: 'utf8'}, function (e, d) {
		d = d.replace(/\r/g, '');
		d = d.split('\n');

		var table = [];

		for (var i = 0; i < d.length; i++) {
			var c = d[i].split(/\s+/g)[0];
			var a = d[i].split(/\s+/g)[1];
			table[c] = parseFloat(a);
		}

		cb(table);
	});
};


function complement(p) {
	return p.replace(/A/g, '1').replace(/C/g, '2').replace(/G/g, '3').
	replace(/T/g, '4').replace(/1/g, 'T').replace(/2/g, 'G').replace(/3/g, 'C').
	replace(/4/g, 'A').split('');
}

read(function (e, d) {
	d = d.replace(/\r/g, '');

	write();
}); 	