const pgp = require('pg-promise')()
const config = require('./config')
const connectionString = config(process.env.NODE_ENV)
const db = pgp(connectionString)

module.exports = db
