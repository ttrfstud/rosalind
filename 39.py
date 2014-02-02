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
	not_involved = catalan(string[1:], count + 1)
	for i in range(4, len(string)):
		# print('\t'* count, 'interior ', string[1:i])
		# print('\t'* count, 'exterior', string[i + 1:])
		if bounds(principal, string[i], count):
			interior = catalan(string[1:i], count + 1)
			exterior = catalan(string[i + 1:], count + 1)
			# print('\t'* count, 'interior', string[1:i], 'returned', interior)
			# print('\t'* count, 'exterior', string[i + 1:], 'returned', exterior)
			cat += exterior * interior

	cat += not_involved
	memo[string] = cat
	# print('for', string, 'cat is', cat)
	return cat

def bounds(b1, b2, count):
	s = b1 + b2

	if s == 'AU' or s == 'UA' or s == 'CG' or s == 'GC' or s == 'GU' or s == 'UG':
		# print('\t'* count, 'great bounds')
		return 1

	return 0 

with open('data') as f:
	rna = f.read()

	num = catalan(rna, 0)
	print('catalan', num)

	with open('out', 'w') as f:
		f.write(str(num))

