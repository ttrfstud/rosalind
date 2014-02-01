var read0 = require('fs').readFile;
var read = require('fs').readFile.bind(null, 'data', {encoding: 'utf8'});
var write = require('fs').writeFileSync.bind(null, 'out');

read(function (e, d) {
	d = d.replace(/\r/g, '');

	var alphabet = d.split('\n')[0].split(' ');
	var n = parseInt(d.split('\n')[1]);

	console.log('alphabet', alphabet);
	var permutations = [];

	permutate(n, alphabet, [], permutations);

	write(permutations.sort(function comp(a, b) {
		console.log('comparin', a, b);
		if (!a.length) {
			return 0;
		}
		if (alphabet.indexOf(a[0]) > alphabet.indexOf(b[0]))
			return 1;
		if (alphabet.indexOf(a[0]) === alphabet.indexOf(b[0]))
			return comp(a.slice(1), b.slice(1));
		if (alphabet.indexOf(a[0]) < alphabet.indexOf(b[0]))
			return -1;
	}).
		map(function (el) { return el.join('');}).join('\n'));
});

function range(n) {
	var a = [];

	for (var i = 1; i <= n; i++) {
		a.push(i);
	}

	return a;
}

function permutate(n, left, p, container) {
	if (!n || !left.length) {
		container.push(p);
		return;
	}

	for (var i = 0; i < left.length; i++) {
		var copyp = p.slice(0);
		copyp.push(left[i]);

		permutate(n - 1, left, copyp, container);
	}
} 	