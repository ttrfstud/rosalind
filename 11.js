var read = require('fs').readFile.bind(null, 'data', {encoding: 'utf8'});
var write = require('fs').writeFileSync.bind(null, 'out');

read(function (e, d) {
	d = d.replace(/\r/g, '');

	var k = parseInt(d.split(' ')[0]);
	var m = parseInt(d.split(' ')[1]);
	var n = parseInt(d.split(' ')[2]);

	/*
		First hmd
		Second hmd k/ (k + m + n) + (k - 1) / (k + m + n - 1)

		First hmd
		Second h k/ (k + m + n) + m  / (k + m + n - 1). 

		First hmd
		Second hmr  k/ (k + m + n) + n / (k + m + n - 1). 

		First h
		Second hmd m \\ k

		First h
		Second h m \\ m - 1

		First h
		Second hmr m \\ n

		First hmr
		Second hmd n \\ k

		First hmr
		Second h n \\ m

		First hmr
		Second hmr n \\ n - 1

	*/

	console.log(k, 'k');
	console.log(m, 'm');
	console.log(n, 'n');
	var d1 = (k + m + n);
	var d2 = (k + m + n - 1);
	console.log('d1', d1);
	console.log('d2', d2);
	var hmdhmd = k/ d1 * (k - 1) / d2;
	hmdhmd *= 1;
	console.log('hmdhmd', hmdhmd);
	var hmdh = k / d1 * m / d2;
	hmdh *= 1;
	var hmdhmr = k / d1 * n / d2;
	hmdhmr *= 1;
	var hhmd = m / d1 * k / d2;
	hhmd *= 1;
	var hh = m / d1 * (m - 1) / d2;
	hh *= 0.75;
	var hhmr = m / d1 * n / d2;
	hhmr *= 0.5;
	var hmrhmd = n / d1 * k / d2;
	hmrhmd *= 1;
	var hmrh = n / d1 * m / d2;
	hmrh *= 0.5;
	var hmrhmr = n / d1 * (n - 1) / d2;
	hmrhmr *= 0;

	var prob = hmdhmd + hmdh + hmdhmr + hhmd + hh + hhmr +
	hmrhmd + hmrh + hmrhmr;

	write(prob);
}); 	