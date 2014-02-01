var read0 = require('fs').readFile;
var read = require('fs').readFile.bind(null, 'data', {encoding: 'utf8'});
var write = require('fs').writeFileSync.bind(null, 'out');

var mmt = function (cb) {
	read0('monoisotopic-mass-table', {encoding: 'utf8'}, function (e, d) {
		d = d.replace(/\r/g, '');
		d = d.split('\n');

		var table = [];

		for (var i = 0; i < d.length; i++) {
			var c = d[i].split(/\s+/g)[0];
			var a = d[i].split(/\s+/g)[1];
			table[a] = c;
		}

		cb(table);
	});
};

mmt(function (table) {
	read(function (e, d) {
		console.log(table);
		d = d.replace(/\r/g, '').split('\n');

		var masses = d.map(function (e) { return parseFloat(e);});
		
		var protein = '';

		for (var i = 0; i < masses.length - 1; i++) {
			var diff = masses[i + 1] - masses[i];
			var key;

			for (var j in table) {
				if (Math.abs(parseFloat(j) - diff) < 1e-4) {
					console.log(parseFloat(j), diff, parseFloat(j) - diff);
					key = j;
				}
			}

			protein += table[key];
		}

		write(protein);
	});
});
