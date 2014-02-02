with open('data') as f:
	params = f.read().split('\n')

	n = int(params[0])
	already = len(params) - 1

	print(already)
	with open('out', 'w') as f:
		f.write(str(n - 1 - already))

