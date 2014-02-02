var read0 = require('fs').readFile;
var read = require('fs').readFile.bind(null, 'data', {encoding: 'utf8'});
var write = require('fs').writeFileSync.bind(null, 'out');

read(function (e, d) {

	d =d.replace(/\r/g, '').split('\n');
	var n = parseInt(d[0]);
	var dna = d[1];
	var gccs = d[2].split(' ').map(function (e) { return parseFloat(e);});
	
	var at = 0;
	var gc = 0;

	for (var i = 0; i < dna.length; i++) {
		if (dna[i] === 'A' || dna[i] === 'T') at++;
		if (dna[i] === 'C' || dna[i] === 'G') gc++;
	}

	var rsults = [];
	for (var i = 0; i < gccs.length; i++) {
		var gcc = gccs[i];
		var p = Math.pow(gcc / 2, gc) * Math.pow((1 - gcc) / 2, at);
		console.log(p, 'p');
		p *= (n - dna.length + 1);

		rsults.push(p);
	}

	write(rsults.join(' '));
	// write(1 - b(N, 0, p));
});