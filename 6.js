var read = require('fs').readFile.bind(null, 'data', {encoding: 'utf8'});
var write = require('fs').writeFileSync.bind(null, 'out');
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
			label = strings[i].substr(1);
		} else {
			val += strings[i];
		}
	}

	if (val && label) {
		obj[label] = val;
	}

	return obj;
}

read(function (e, d) {
	d = d.replace(/\r/g, '');

	var graph = parseFasta(d);

	var edges = [];

	for (var i in graph) if (graph.hasOwnProperty(i)) {
		for (var j in graph) if (graph.hasOwnProperty(j)) {
			var suffix = graph[i].substr(graph[i].length - 3, 3);
			var prefix = graph[j].substr(0, 3);
			// console.log(i, ' i j ', j, suffix, prefix, graph[i], graph[j	]);

			if (i !== j && suffix === prefix) {
				edges.push(i + ' ' + j);
			}
		}
	}

	write(edges.join('\n'));
});