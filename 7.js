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

	return obj;
}

read(function (e, d) {
	d = d.replace(/\r/g, '');
	var dnas = parseFasta(d);

	var champion;
	var max = 0;
	for (var i in dnas) if (dnas.hasOwnProperty(i)) {
		console.log(dnas[i], 'dnasi');
		var gcContent = dnas[i].match(/[C|G]/g).length / dnas[i].length;

		if (gcContent > max) {
			max = gcContent;
			champion = i;
		}
	}

	write(champion.substr(1) + '\n' + max * 100);
});