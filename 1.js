var read = require('fs').readFile.bind(null, 'data', {encoding: 'utf8'});
var write = require('fs').writeFileSync;

read(function (e, d) {
	d = d.replace(/\r/g, '');

	var as = 0, cs = 0, gs = 0, ts = 0;
	for (var i = 0; i < d.length; i++) {
		switch(d[i]) {
			case 'A' : as++; break;
			case 'C' : cs++; break;
			case 'G' : gs++; break;
			case 'T' : ts++; break;
		}
	}

	write('out', [as, cs, gs, ts].join(' '));
}); 	