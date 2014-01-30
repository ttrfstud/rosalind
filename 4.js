var read = require('fs').readFile.bind(null, 'data', {encoding: 'utf8'});
var write = require('fs').writeFileSync;

read(function (e, d) {
	d = d.replace(/\r/g, '');

	var n = d.split(' ')[0];
	var k = d.split(' ')[1];

	var f = [1, 1];

	for (var i = 2; i < n; i++) {
		f[i] = f[i - 1] + k * f[i - 2];
	}

	write('out', f[f.length - 1]);
}); 	