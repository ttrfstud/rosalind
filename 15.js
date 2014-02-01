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
			if (!table[a]) table[a] = [];
			table[a].push(c);
		}

		cb(table);
	});
};

codons(function (table) {
	read(function (e, d) {
		d = d.replace(/\r\n/g, '');

		var ways = 3;
		for (var i = 0; i < d.length; i ++) {
			ways *= table[d[i]].length;
			ways %= 1000000;
		}
		
		write(ways);
	}); 	
});
	