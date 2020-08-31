module.exports = {
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module'
	},
	rules: {
		semi: ['error', 'never'],
		quotes: ['error', 'single']
	},
	env: {
		node: true,
		es6: true
	}
}