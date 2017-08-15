const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const dbHelper = require('../helpers/db')
const server = require('../../src/server')
const cheerio = require('cheerio')

chai.use(chaiHttp)

describe('End to End testing: tests the http routes exposed to the server', () => {
  beforeEach('truncate the DB tables and seed', () => {
    return dbHelper.initDB()
  })

  it('GET / should return a status code of 200 and html', (done) => {
		chai.request(server)
				.get('/')
				.end((error, response) => {
					expect(response).to.have.status(200)
					expect(response).to.be.html
					done()
				})
  })

  it('GET /contacts/new should return a status code of 200 and html', (done) => {
		chai.request(server)
				.get('/')
				.end((error, response) => {
					expect(response).to.have.status(200)
					expect(response).to.be.html
					done()
				})
  })

  it('POST /contacts with correct form data returns a status 200', (done) => {
		chai.request(server)
				.post('/contacts')
				.type('form')
				.send({ first_name: 'Patrick', last_name: 'Porche' })
				.end((error, response) => {
					expect(response).to.have.status(200)
					done()
				})
  })

	it('POST /contacts with incorrect form data returns a status 422', (done) => {
		chai.request(server)
				.post('/contacts')
				.type('form')
				.send({ wrong: 'Patrick', keys: 'Porche' })
				.end((error, response) => {
					expect(response).to.have.status(422)
					expect(response.text).to.contain('ERROR: Cannot read property \'id')
					done()
				})
  })

	it('GET /contacts/:contactId should return a status code of 200 and html', (done) => {
		chai.request(server)
				.get('/contacts/1')
				.end((error, response) => {
					expect(response).to.have.status(200)
					expect(response).to.be.html
					done()
				})
  })

	it('GET /contacts/:contactId/delete should return a status code of 200 and html', (done) => {
		chai.request(server)
				.get('/contacts/1/delete')
				.end((error, response) => {
					expect(response).to.have.status(200)
					expect(response).to.be.html
					done()
				})
  })

	it('GET /contacts/:contactId/delete should return a status code of 200 and html', (done) => {
		chai.request(server)
				.get('/contacts/200/delete')
				.end((error, response) => {
					expect(response).to.have.status(200)
					expect(response).to.be.html
					done()
				})
  })

	it('GET contacts/search shoiuld return a status code of 200 and html', (done) => {
		chai.request(server)
				.get('/contacts/search')
				.query({q: 'nee'})
				.end((error, response) => {
					expect(response).to.have.status(200)
					expect(response).to.be.html
					done()
				})
  })


})
