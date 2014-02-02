var read0 = require('fs').readFile;
var read = require('fs').readFile.bind(null, 'data', {encoding: 'utf8'});
var write = require('fs').writeFileSync.bind(null, 'out');

read(function (e, d) {

	d =d.replace(/\r/g, '').split('\n');
	var n = parseInt(d[0]);

	var container = [];
	permutate(range(1, n), [], container);
	
	// There are probably n!*2^n of them

	write(fact(n) * Math.pow(2, n) + '\n' + container.join('\n'));
});

function fact(n) {
	var f = 1;

	for (var i = 1; i <= n; i++) {
		f *= i;
	}

	return f;
}

function permutate(left, perm, container) {
	if (!left.length) {
		container.push(perm.join(' '));
		return;
	}

	for (var i = 0; i < left.length; i++) {
		var cleft = left.slice(0);
		var el = cleft[i];
		cleft.splice(i, 1);
		permutate(cleft, perm.concat(el), container);
		permutate(cleft, perm.concat(-el), container);
	}
}


function range(l, u) {
	var a = [];

	for (var i = l; i <= u; i++) {
		a.push(i);
	}

	return a;
}