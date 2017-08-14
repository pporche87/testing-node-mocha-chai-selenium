module.exports = (env) => {
	if (env === 'development') {
		return 'postgres://localhost:5432/contacts_development'
	} else if (env === 'test') {
		return 'postgres://localhost:5432/contacts_test'
	}
}
