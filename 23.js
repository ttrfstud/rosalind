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
			table[c] = parseFloat(a);
		}

		cb(table);
	});
};

mmt(function (table) {
	read(function (e, d) {
		d = d.replace(/[\r|\n]/g, '');

		console.log(table);
		var mass = 0;
		for (var i = 0; i < d.length; i++) {
			mass += table[d[i]];
		}

		write(mass);
	});
});
