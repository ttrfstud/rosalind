var read = require('fs').readFile.bind(null, 'data', {encoding: 'utf8'});
var write = require('fs').writeFileSync.bind(null, 'out');

read(function (e, d) {
	d = d.replace(/\r/g, '');

	var split = d.split('\n');

	var graph = {};

	for (var i = 0; i < split.length; i+= 2) {
		graph[split[i].substr(1)] = split[i + 1];
	}

	var edges = [];

	for (var i in graph) if (graph.hasOwnProperty(i)) {
		for (var j in graph) if (graph.hasOwnProperty(j)) {
			var suffix = graph[i].substr(graph[i].length - 3, 3);
			var prefix = graph[j].substr(0, 3);
			console.log(i, ' i j ', j, suffix, prefix, graph[i], graph[j	]);

			if (i !== j && suffix === prefix) {
				edges.push(i + ' ' + j);
			}
		}
	}

	write(edges.join('\n'));
});