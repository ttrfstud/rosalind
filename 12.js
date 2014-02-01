var read = require('fs').readFile.bind(null, 'data', {encoding: 'utf8'});
var write = require('fs').writeFileSync.bind(null, 'out');

read(function (e, d) {
	d = d.replace(/\r/g, '').split(' ');

	var AAAA = parseInt(d[0]);
	var AAAa = parseInt(d[1]);
	var AAaa = parseInt(d[2]);
	var AaAa = parseInt(d[3]);
	var Aaaa = parseInt(d[4]);
	
	write(AAAA * 2 + AAAa * 2 + AAaa * 2 + AaAa * 2 * .75 + Aaaa * 2 * .5);
}); 	