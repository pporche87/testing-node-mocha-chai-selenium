const expect = require('chai').expect
const dbContacts = require('../../../src/db/contacts')
const dbHelper = require('../../helpers/db')


describe('Integration tests: tests to test all the database functions', function() {

  beforeEach('truncate and seed the DB before each test', function() {
    return dbHelper.initDB()
  })

  it('createContact(), creates a new contact to the db', function() {
    const newContact = { first_name: 'Patrick', last_name: 'Porche' }
    return dbContacts.createContact(newContact)
      .then((contact) => {
        expect(contact[0].id).to.equal(4)
        expect(contact[0].first_name).to.equal('Patrick')
        expect(contact[0].last_name).to.equal('Porche')
      })
  })

  it('getContacts(), gets all existing contacts from the db', function() {
    return dbContacts.getContacts()
      .then((contacts) => {
        expect(contacts.length).to.equal(3)
        expect(contacts[0].first_name).to.equal('Jared')
        expect(contacts[1].last_name).to.equal('Welsh')
      })
  })

  it('getContact(), gets an existing contact from the db by id', function() {
    return dbContacts.getContact(1)
      .then((contact) => {
        expect(contact.id).to.equal(1)
        expect(contact.first_name).to.equal('Jared')
        expect(contact.last_name).to.equal('Grippe')
      })
  })

  it('deleteContact(), deletes an existing contact from the db by id', function() {
    return dbContacts.deleteContact(1)
      .then(() => dbContacts.getContacts()
        .then(contacts => {
          expect(contacts.length).to.equal(2)
          expect(contacts[0].id).to.equal(2)
          expect(contacts[0].first_name).to.equal('Tanner')
          expect(contacts[0].last_name).to.equal('Welsh')
        })
      )
  })

  it('searchForContact(), searches for contact by last_name or first_name', function() {
    return dbContacts.searchForContact('Jared')
      .then((contact) => {
        expect(contact[0].id).to.equal(1)
        expect(contact[0].first_name).to.equal('Jared')
        expect(contact[0].last_name).to.equal('Grippe')
      })
  })

  it('searchForContact(), searches for contact by last_name or first_name', function() {
    return dbContacts.searchForContact('James')
      .then((contact) => {
        expect(contact[0].id).to.equal(3)
        expect(contact[0].first_name).to.equal('NeEddra')
        expect(contact[0].last_name).to.equal('James')
      })
  })
})
