var read0 = require('fs').readFile;
var read = require('fs').readFile.bind(null, 'data', {encoding: 'utf8'});
var write = require('fs').writeFileSync.bind(null, 'out');

var TRUTH_PREVAILS = true;

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
		// console.log(table);
		d = d.replace(/\r/g, '').split('\n');

		var parent = parseFloat(d[0]);
		var masses = d.slice(1).map(function (e) { return parseFloat(e);});

		var cions = [];
		var marked = [];

		for (var i = 0; i < masses.length; i++) {
			for (var j = i + 1; j < masses.length; j++) {
				if (i !== j && marked.indexOf(i) === -1 &&
				marked.indexOf(j) === -1 && 
				appr(parent, (masses[i] + masses[j]))) {
					cions.push([masses[i], masses[j]]);
					marked.push(i);
					marked.push(j);
					break;
				}
			}
		}
		
		var len = cions.length;
		// console.log(cions);

		var path = [cions[0]];
		while (TRUTH_PREVAILS) {
			if (path.length === len) break;

			// console.log(path, 'in prog');
			var prev = path[path.length - 1];

			for (var i in table) {
				var m = parseFloat(i);

				// console.log('\tmass', m);
				var idxHit = -1;

				for (var j = 0; j < cions.length; j++) {
					// console.log('\t\tfirst',cions[j][0],m +  prev[0], j);
					// console.log('\t\tsec',cions[j][1],m +  prev[0], j);
					if (appr(cions[j][0],m +  prev[0])) {
						// console.log('hit alrt');
						idxHit = j; break;
					} else if (appr(cions[j][1], m + prev[0])) {
						// console.log('chit alrt');

						cions[j].reverse();
						idxHit = j; break;
					}
				}

				if (idxHit + 1) {
					// console.log('hit is', cions[idxHit]);
					var cion = cions[idxHit];
					cions.splice(idxHit, 1);
					path.push(cion);
					idxHit = -1;
					break;
				} else {
					idxHit = -1;
				}
			}
		}

		console.log(path);

		masses = path.map(function (el) { return el[0];});
		var protein = '';



		for (var i = 0; i < masses.length - 1; i++) {
			var diff = masses[i + 1] - masses[i];
			var key;

			for (var j in table) {
				if (Math.abs(parseFloat(j) - diff) < 1e-4) {
					// console.log(parseFloat(j), diff, parseFloat(j) - diff);
					key = j;
				}
			}

			protein += table[key];
		}

		write(protein);
	});
});

function appr(a1, a2) {
	return Math.abs(a1 - a2) < 1e-4;
}