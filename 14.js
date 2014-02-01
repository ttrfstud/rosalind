var http = require('http');
var read = require('fs').readFile;
var write = require('fs').writeFileSync;

var MOTIF_LENGTH = 4;

function parseFasta(fasta) {
	var strings = fasta.split('\n');

	var obj = {};
	var val = '';
	var label = '';

	console.log('parsin..', fasta);
	for (var i = 0; i < strings.length; i++) {
		if (strings[i].charAt(0) === '>') {
			if (val) obj[label] = val;
			val = '';
			label = strings[i];
		} else {
			val += strings[i];
		}
	}

	if (val && label) {
		obj[label] = val;
	}

	return obj;
}

read('data', {encoding: 'utf8'}, function (e, d) {
	var urls = [];

	d = d.replace(/\r/g, '').split('\n');

	for (var i = 0; i < d.length; i++) {
		urls.push(d[i] + '.fasta');
	}

	console.log('urls', urls);

	function cb(fastas) {
		console.log(fastas, 'fastas');

		var parsed = [];

		for (var i in fastas) {
			parsed.push(parseFasta(fastas[i]));
		}

		console.log('parsed', parsed);

		var result = [];

		for (var i = 0; i < parsed.length; i++) {
			for (var j in parsed[i]) if (parsed[i].hasOwnProperty(j)) {
				result[Object.keys(fastas)[i]] = [];
				for (var k = 0; k < parsed[i][j].length; k ++) {
					var sub = parsed[i][j].substr(k, MOTIF_LENGTH);
					if (Object.keys(fastas)[i].indexOf('P07204_TRBM_HUMAN') !== -1)
						console.log(sub);

					if (/N[^P][(S|T)][^P]/g.test(sub)) {
						if (Object.keys(fastas)[i].indexOf('P07204_TRBM_HUMAN') !== -1)
							console.log('gotcha@', k);
						result[Object.keys(fastas)[i]].push(k + 1);
					}
				}
			}
		}

		var res = '';

		for (var i in result) {
			if (result[i].length) {
				console.log(i);
				var key = i.substring(0, i.indexOf('\.'));
				console.log(key);
				res += key + '\n';
				res += result[i].join(' ') + '\n';
			}
		}

		write('out', res);
	}

	var fastas = [];
	function call(url) {
		var split = url.split(' ');
		urlSelf = split[0];
		urlInit = split[1];
		urls.splice(urls.indexOf(url), 1);
		try {
			var req = http.get({
					hostname: 'www.uniprot.org',
					path: '/uniprot/' + urlSelf}, function (res) {
				console.log('from url...', url);
				console.log('url itself is:', urlSelf);
				var fasta = '';
				res.setEncoding('utf8');
				res.on('data', function (chunk) {
					fasta += chunk;
				});

				res.on('end', function () {
					console.log('urlinit', urlInit);
					console.log('urlself', urlSelf);
					if (res.statusCode === 200) 
						fastas[urlInit || urlSelf] = fasta;
					else {
						urls.push(res.headers.location.match(/uniprot\/(.)*/)[0].substr(8) + ' ' + urlSelf);
					}
					req.shouldKeepAlive = false;
					if (urls.length) {
						call(urls[0]);
					} else {
						cb(fastas);
					}
				})
			});
		} catch (e) {
			console.log (e.message);
		}
	}

	call(urls[0]);
});
