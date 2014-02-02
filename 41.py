with open('data') as f:
	params = f.read().split('\n')

	n = int(params[0])

	with open('out', 'w') as f:
		f.write(str(n - 2))

