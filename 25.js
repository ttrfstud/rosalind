var read0 = require('fs').readFile;
var read = require('fs').readFile.bind(null, 'data', {encoding: 'utf8'});
var write = require('fs').writeFileSync.bind(null, 'out');

read(function (e, d) {
	d = d.replace(/\r/g, '');

	var dna = d.split('\n').slice(1).join('');

	var cnd = 0;

	var t = [0];

	for (var i = 1; i < dna.length; i++) {
		if (dna[i] === dna[cnd]) {
			cnd++;
			t[i] = cnd;
			continue;
		} else while (cnd > 0 && dna[cnd] !== dna[i]) {
			cnd = t[cnd - 1];
		}

		if (dna[cnd] === dna[i]) cnd++;
		t[i] = cnd;
	}
	
	write(t.join(' '));
});
