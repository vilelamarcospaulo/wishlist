process.env.TEST = true
process.env.MONGO_DB_NAME = 'WishlistDB_TEST'

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../app.js');

describe('get list client', () => {
    it('OK, get empty list of clients', (done) => {
        request(app).get('/client')
          .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('clients');
            expect(body.clients.length).to.equal(0);
            done();
          })
          .catch((err) => done(err));
      });

      it('OK, get list with a client', (done) => {
        request(app).post('/client')
        .send({ name: 'Teste1', email: 'abc@test.com.br' })
        .then((res) => {
            request(app).get('/client')
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property('clients');
                expect(body.clients.length).to.equal(1);
                done();
            })
        })
        .catch((err) => done(err));
      });

})