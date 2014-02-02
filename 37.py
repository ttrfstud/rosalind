memo = {}

def catalan(string, count):
	# print ('\t'* count, '\'', string)
	if string in memo:
		# print ('\t'* count, 'from memory', string)
		return memo[string]

	if len(string) is 0:
		return 1

	# print('\t'* count, 'examining', string)
	principal = string[0]
	cat = 0
	for i in range(1, len(string)):
		# print('\t'* count, 'interior ', string[1:i])
		# print('\t'* count, 'exterior', string[i + 1:])
		if allowed(string[1:i], principal, string[i], count):
			interior = catalan(string[1:i], count + 1)
			exterior = catalan(string[i + 1:], count + 1)
			# print('\t'* count, 'interior', string[1:i], 'returned', interior)
			# print('\t'* count, 'exterior', string[i + 1:], 'returned', exterior)
			cat += exterior * interior

	memo[string] = cat
	print('for', string, 'cat is', cat)
	return cat

def allowed(sub, b1, b2, count):
	# print('\t'* count, 'testing for allowance', sub, b1, b2)
	if not(bounds(b1, b2, count)):
		return 0

	if len(sub) is 0:
		return 1

	a = 0
	c = 0
	g = 0
	u = 0

	for i in range(len(sub)):
		if sub[i] == 'A':
			a += 1
		elif sub[i] == 'C':
			c += 1
		elif sub[i] == 'G':
			g += 1
		else:
			u += 1

	return a == u and c == g

def bounds(b1, b2, count):
	s = b1 + b2

	if s == 'AU' or s == 'UA' or s == 'CG' or s == 'GC':
		# print('\t'* count, 'great bounds')
		return 1

	return 0 

with open('data') as f:
	rna = ''.join(f.read().split()[1:])

	num = catalan(rna, 0)
	print('catalan', num)

	with open('out', 'w') as f:
		f.write(str(num % 1000000))

