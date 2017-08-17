require('chromedriver')
const expect = require('chai').expect
const test = require('selenium-webdriver/testing')
const webdriver = require('selenium-webdriver')
const By = webdriver.By

test.describe('UI testing', function() {
  this.timeout(5000)
  const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build()


  test.it('/contacts/new should render a form to create a new contact', function() {
    driver.get('http://localhost:8080/contacts/new')
    driver.findElement(By.id('new-contact-form'))
      .then(formEl => formEl.isDisplayed())
      .then(isformDisplayed => {
        expect(isformDisplayed).to.equal(true)
        driver.quit()
      })
  })

  test.it('/contacts/new should create a new contact and be navigated to /contacts/:contactId', function() {
    this.timeout(5000)
    const driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build()

    driver.get('http://localhost:8080/contacts/new')
    driver.findElement(By.name('first_name')).sendKeys('Patrick').then(() => {
      driver.findElement(By.name('last_name')).sendKeys('Porche').then(() => {
        driver.findElement(By.id('new-contact-submit')).click().then(() => {
          driver.getCurrentUrl().then((url) => {
            expect(url).to.equal('http://localhost:8080/contacts/4')
            driver.quit()
          })
        })
      })
    })

  })

  test.it('/ should see a list of contacts on the page', function() {
    this.timeout(5000)
    const driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build()

    driver.get('http://localhost:8080')
    driver.findElements(By.className('contact-link')).then((contacts) => {
      expect(contacts.length).to.equal(4)
      driver.quit()
    })
  })

  test.it('on click of delete link, it should confirm delete action and delete a contact', function() {
    this.timeout(5000)
    const driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build()

    driver.get('http://localhost:8080')
    driver.findElement(By.className('delete-contact')).click().then(() => {
      driver.switchTo().alert().accept()
      driver.findElements(By.className('contact-link')).then((contacts) => {
        expect(contacts.length).to.equal(3)
        driver.quit()
      })
    })
  })

  test.it('searching for a contact should show a list of matching contacts', function() {
    this.timeout(5000)
    const driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build()

    driver.get('http://localhost:8080')
    driver.findElement(By.name('q')).sendKeys('ja' + '\n').then(() => {
      driver.findElement(By.className('contact-link')).then((contact) => {
        contact.getText().then((text) => {
          expect(text).to.equal('NeEddra James')
          driver.quit()
        })
      })
    })
  })
})
