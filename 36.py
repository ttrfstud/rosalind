from math import factorial as fact

with open('data') as f:
	rna = ''.join(f.read().split()[1:])

	a = 0
	c = 0

	# 15576347845762967593203793920000000
	# 15576347845762968601800258348908544
	for i in range(len(rna)):
		if rna[i] is 'A':
			a += 1
		if rna[i] is 'C':
			c += 1

	with open('out', 'w') as f:
		f.write(str(fact(a) * fact(c)))
