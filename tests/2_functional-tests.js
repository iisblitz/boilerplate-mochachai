const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  suite('Integration tests with chai-http', function () {
    // #1
    test('Test GET /hello with no name', function (done) {
      chai
        .request(server)
        .get('/hello')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Guest');
          done();
        });
    });

    // #2
    test('Test GET /hello with your name', function (done) {
      chai
        .request(server)
        .get('/hello?name=David_Gonzalez')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello David_Gonzalez');
          done();
        });

    });

    // #3
    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .put('/travellers')
        .send({ surname: "Colombo" })
        .end(function (err, res) {
          assert.equal(res.status, 200, 'response status should be 200')
          assert.equal(res.type, 'application/json', 'response should be json')
          assert.equal(res.body.name, "Cristoforo", 'res.body.name should be "Christoforo"')
          assert.equal(res.body.surname, "Colombo", 'res.body.name should be "Colombo"')
          done();
        });
    });


    // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai.request(server).put('/travellers').send({ surname: "da Verrazzano" }).end(function (err, res) {
        assert.equal(res.status, 200, 'response status should be 200')
        assert.equal(res.type, 'application/json', 'response should be json')
        assert.equal(res.body.name, "Giovanni", 'response should be "Giovanni"')
        assert.equal(res.body.surname, "da Verrazzano", 'response should be "da Verrazzano"')
      })
      done();
    });
  });
});

const Browser = require('zombie');
Browser.site = 'https://boilerplate-mochachai.iisblitz.repl.co'
const browser = new Browser();

suite('Functional Tests with Zombie.js', function () {
  this.timeout(500);
  suiteSetup(function (done) {
    return browser.visit('/', done)
  })

  suite('Headless browser', function () {
    test('should have a working "site" property', function () {
      assert.isNotNull(browser.site);
      done();
    });
  });

  suite('"Famous Italian Explorers" form', function () {

    // #5
    test('Submit the surname "Colombo" in the HTML form', function (done) {
      assert.fail();

      done();
    });
    // #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      assert.fail();

      done();
    });

  });
  after(function () { chai.request(server).get('/') });
});
