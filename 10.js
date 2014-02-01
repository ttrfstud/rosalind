var read = require('fs').readFile.bind(null, 'data', {encoding: 'utf8'});
var write = require('fs').writeFileSync.bind(null, 'out');

function parseFasta(fasta) {
	var strings = fasta.split('\n');

	var obj = {};
	var val = '';
	var label = '';

	for (var i = 0; i < strings.length; i++) {
		if (strings[i].charAt(0) === '>') {
			if (val) obj[label] = val;
			val = '';
			label = strings[i];
		} else {
			val += strings[i];
		}
	}

	if (val && label) {
		obj[label] = val;
	}

	return obj;
}

read(function (e, d) {
	d = d.replace(/\r/g, '');

	var data = parseFasta(d);

	var dnas = [];

	for (var i in data) if (data.hasOwnProperty(i)) {
		dnas.push(data[i]);
	}

	console.log('data', data);
	console.log('dna', dnas);

	var as, cs, gs, ts;
	var profile = [];

	for (var i = 0; i < dnas[0].length; i++) {
		as = 0, cs = 0, gs = 0, ts = 0;

		for (var j = 0; j < dnas.length; j++) {
			switch(dnas[j][i]) {
				case 'A': as++; break;
				case 'C': cs++; break;
				case 'G': gs++; break;
				case 'T': ts++; break;
			}			
		}

		profile.push([as, cs, gs, ts]);
	}

	var map = ['A', 'C', 'G', 'T'];
	var consensus = '';
	for (var i = 0; i < profile.length; i++) {
		var pi = profile[i];
		var max = 0, idx;
		for (var j = 0; j < pi.length; j++) {
			if (pi[j] > max) {
				idx = j;
				max = pi[j];
			}
		}

		consensus += map[idx];
	}

	var mp = '';

	for (var i = 0; i < 4; i++) {
		mp += map[i] + ':';

		for (var j = 0; j < profile.length; j++) {
			mp += ' ' + profile[j][i];
		}

		mp += '\n';
	}

	write(consensus + '\n' + mp);
}); 	