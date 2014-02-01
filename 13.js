var read0 = require('fs').readFile;
var read = require('fs').readFile.bind(null, 'data', {encoding: 'utf8'});
var write = require('fs').writeFileSync.bind(null, 'out');

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

codons(function (table) {
	read(function (e, d) {
		d = d.replace(/\r\n/g, '');

		var acid = '';
		for (var i = 0; i < d.length; i += 3) {
			acid += table[d.substr(i, 3)];
		}
		
		write(acid);
	}); 	
});
	