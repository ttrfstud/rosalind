with open('data') as f:
	params = f.read().split()

	n = int(params[0])
	m = int(params[1])

	print('n', n)
	print('m', m)
	slots = [0 for i in range(0, m)]

	slots[0] = 1

	for i in range(1, n):
		summa = 0
		for j in range(m - 1, 0, -1):
			summa += slots[j]
			slots[j] = slots[j - 1]
		slots[0] = summa
		print(slots)
		print('sum', sum(slots))
		
	with open('out', 'w') as f:
		f.write(str(sum(slots)))


