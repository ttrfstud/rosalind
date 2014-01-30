var read = require('fs').readFile.bind(null, 'data', {encoding: 'utf8'});
var write = require('fs').writeFileSync.bind(null, 'out');

read(function (e, d) {
	d = d.replace(/\r/g, '');

	var n = parseInt(d.split(' ')[0]);
	var m = parseInt(d.split(' ')[1]);

	var slots = Array(m + 1).join('0').split('').map(function (el) { return parseInt(el);});
	slots[0] = 1;

	for (var i = 1; i < n; i++) {
		var sum = 0;
		for (var j = m - 1; j >= 1; j--) {
			sum += slots[j];
			slots[j] = slots[j - 1];
		}
		slots[0] = sum;
		console.log(slots);
	}

	write(slots.reduce(function (a, b) { 
		console.log(a, '+', b, 'is', a + b);
		return a + b; }));
}); 	