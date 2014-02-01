var read0 = require('fs').readFile;
var read = require('fs').readFile.bind(null, 'data', {encoding: 'utf8'});
var write = require('fs').writeFileSync.bind(null, 'out');

read(function (e, d) {
	d = d.replace(/[\r|\n]/g, '');

	var n  = parseInt(d);

	var permutations = [];

	permutate(range(n), [], permutations);

	write(permutations.length + '\n' + permutations.
		map(function (el) { return el.join(' ');}).join('\n'));
});

function range(n) {
	var a = [];

	for (var i = 1; i <= n; i++) {
		a.push(i);
	}

	return a;
}

function permutate(left, p, container) {
	if (!left.length) {
		container.push(p);
		return;
	}

	for (var i = 0; i < left.length; i++) {
		var copy = left.slice(0);
		var copyp = p.slice(0);
		copyp.push(copy[i]);
		copy.splice(i, 1);

		permutate(copy, copyp, container);
	}
} 	