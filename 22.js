var read0 = require('fs').readFile;
var read = require('fs').readFile.bind(null, 'data', {encoding: 'utf8'});
var write = require('fs').writeFileSync.bind(null, 'out');

read(function (e, d) {
	d = d.replace(/\r/g, '').split('\n');

	var dna = d.slice(1).join('');

	var rPalindromes = [];

	for (var i = 0; i < dna.length - 4 + 1; i++) {
		for (var j = 4; j < 13; j++) {
			var potentialPalindrome = dna.substr(i, j);

			if (potentialPalindrome.length < j) continue;
			console.log(i, j, potentialPalindrome);
			if (reversePalindrome(potentialPalindrome)) {
				console.log('pp', potentialPalindrome);
				rPalindromes.push([i + 1, j]);
			}
		}
	}

	write(rPalindromes.map(function (el) { return el.join (' ');}).
		join('\n'));
});

function reversePalindrome(p) {
	var cp = complement(p);

	for (var i = 0; i < p.length; i++) {
		if (cp[i] !== p[i]) return false;
	}

	return true;
}

function complement(p) {
	return p.replace(/A/g, '1').replace(/C/g, '2').replace(/G/g, '3').
	replace(/T/g, '4').replace(/1/g, 'T').replace(/2/g, 'G').replace(/3/g, 'C').
	replace(/4/g, 'A').split('').reverse().join('');
}