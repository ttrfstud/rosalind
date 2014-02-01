exports.atl = function (n, k, p) {
	return b(n, range(k, n), p);
}

exports.atm = function (n, k, p) {
	return b (n, range (0, k), p);
}

exports.exct = function (n, k, p) {
	return b (n, [k], p);
}

function b (n, k, p) {
	var prob = 0;


	console.log('range is ', k);
	for (var i = 0; i < k.length; i++) {
		prob += bin(n, k[i]) * 
		Math.pow(p, k[i]) * 
		Math.pow(1 - p,  n - k[i]);
	}

	return prob;
}

function bin (n, k) {
	var c = [];

	for (var i = 0; i <= n; i++) {
		for (var j = 0; j <= Math.min (i, k); j++) {
			if (!c[i]) c[i] = [];

			if (j === 0 || j === i) {
				c[i][j] = 1;
			} else {
				c[i][j] = c[i - 1][j - 1] + c[i - 1][j];
			}
		}
	}

	return c[n][k];
}

function range (l, u) {
	var a = [];

	for (var i = l; i <= u; i++) {
		a.push(i);
	}

	return a;
}