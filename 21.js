var read0 = require('fs').readFile;
var read = require('fs').readFile.bind(null, 'data', {encoding: 'utf8'});
var write = require('fs').writeFileSync.bind(null, 'out');

read(function (e, d) {
	d = d.replace(/\r/g, '');

	var n = parseInt(d.split(' ')[0]);
	var k = parseInt(d.split(' ')[1]);

	var num = 1;
	for (var i = n - k + 1; i <= n; i++) {
		num *= i;
		num %= 1000000;
	}

	write(num);
});