var read = require('fs').readFile.bind(null, 'data', {encoding: 'utf8'});
var write = require('fs').writeFileSync;

read(function (e, d) {
	d = d.replace(/\r/g, '');

	write('out', d.replace(/T/g, 'U'));
}); 	