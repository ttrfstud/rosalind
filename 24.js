var read0 = require('fs').readFile;
var read = require('fs').readFile.bind(null, 'data', {encoding: 'utf8'});
var write = require('fs').writeFileSync.bind(null, 'out');

read(function (e, d) {
	d = d.replace(/\r/g, '');

	var dna = d.split('\n')[0];
	var probs = d.split('\n')[1].split(' ').map(function (el) {
		return parseFloat(el);
	});

	var atprob = 0;
	var gcprob = 0;
	for (var i = 0; i < dna.length; i++) {
		if (dna[i] === 'A' || dna[i] === 'T') atprob++;
		if (dna[i] === 'C' || dna[i] === 'G') gcprob++;
	}

	var endprobs = [];

	console.log('atprobgcprob', atprob, gcprob);
	for (var i = 0; i < probs.length; i++) {
		var gc = probs[i] / 2;
		var at = (1 - probs[i]) / 2;
		var pr = Math.pow(gc, gcprob) * Math.pow(at, atprob);
		console.log(pr);
		endprobs.push(atprob * Math.log(at) / Math.LN10 + gcprob * Math.log(gc) / Math.LN10);
	}

	console.log(endprobs);

	write(endprobs.join(' '));
});
