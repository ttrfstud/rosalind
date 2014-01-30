var read = require('fs').readFile.bind(null, 'data', {encoding: 'utf8'});
var write = require('fs').writeFileSync;

read(function (e, d) {
	d = d.replace(/\r/g, '');

	write('out', d.split('').reverse().join('').
		replace(/A/g, '1').replace(/C/g, '2').replace(/G/g, '3').
		replace(/T/g, '4').replace(/1/g, 'T').replace(/2/g, 'G').
		replace(/3/g, 'C').replace(/4/g, 'A'));
}); 	