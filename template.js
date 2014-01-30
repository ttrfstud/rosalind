var read = require('fs').readFile.bind(null, 'data', {encoding: 'utf8'});
var write = require('fs').writeFileSync.bind(null, 'out');

read(function (e, d) {
	d = d.replace(/\r/g, '');

	write();
}); 	