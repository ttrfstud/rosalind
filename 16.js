var read = require('fs').readFile.bind(null, 'data', {encoding: 'utf8'});
var write = require('fs').writeFileSync.bind(null, 'out');
var bin = require('./bin-c').atl;

read(function (e, d) {
	d = d.replace(/\r/g, '');

	var k = parseInt(d.split(' ')[0]);
	var N = parseInt(d.split(' ')[1]);


	write(bin(Math.pow(2, k), N, 0.25));
}); 	