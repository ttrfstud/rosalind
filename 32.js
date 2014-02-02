var read0 = require('fs').readFile;
var read = require('fs').readFile.bind(null, 'data', {encoding: 'utf8'});
var write = require('fs').writeFileSync.bind(null, 'out');
var b = require('./bin-c').exct;
read(function (e, d) {

	d =d.replace(/\r/g, '').split('\n');
	var N = parseInt(d[0].split(' ')[0]);
	var gcc = d[0].split(' ')[1];

	var dna = d[1];
	
	var at = 0;
	var gc = 0;

	for (var i = 0; i < dna.length; i++) {
		if (dna[i] === 'A' || dna[i] === 'T') at++;
		if (dna[i] === 'C' || dna[i] === 'G') gc++;
	}

	var p = Math.pow(gcc / 2, gc) * Math.pow((1 - gcc) / 2, at);

	write(1 - b(N, 0, p));
});