process.env.TEST = true
process.env.AUTH_TOKEN_VALUE = process.env.JWT_SECRET_VALUE = 'auth4test'

process.env.PRODUCT_API_BASE_URL= 'http://challenge-api.luizalabs.com'
process.env.PRODUCT_API_PATH= 'api/product'

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../app.js')

var tokenAuth = ''
before(done => {
    request(app)
    .post('/auth')
    .set('token', process.env.AUTH_TOKEN_VALUE)
    .expect(200)
    .then(res => {
        tokenAuth = res.body.token
        setTimeout(_ => {done()}, 1000)
    })
    .catch(done)
});

describe('API => get list client', _ => {
    it('OK, get empty list of clients', done => {
        request(app)
        .get('/client')
        .set('Authorization', `Bearer ${tokenAuth}`)
        .expect(200)
        .then(response => response.body)
        .then(body => {
            expect(body).to.contain.property('clients')
            expect(body.clients.length).to.eq(0)
        })
        .then(() => done())
        .catch(done)
    })

    it('NOK, unauthorized', done => {
        request(app)
        .get('/client')
        .expect(401)
        .then(() => done())
        .catch(done)
    })
})

describe('API => create client', _ => {
    it('NOK, unauthorized', done => {
        request(app)
        .post('/client')
        .expect(401)
        .then(() => done())
        .catch(done)
    })

    it('OK, create client', done => {
        request(app)
        .post('/client')
        .set('Authorization', `Bearer ${tokenAuth}`)
        .send({name: 'Jhon Doe', email: 'jhon@corp.com',})
        .expect(200)
        .then(response => response.body)
        .then(body => {
            expect(body).to.contain.property('name')
            expect(body).to.contain.property('email')
            expect(body).to.contain.property('_id')

            expect(body.name).to.eq('Jhon Doe')
            expect(body.email).to.eq('jhon@corp.com')
        })
        .then(() => done())
        .catch(done)
    }),

    it('OK, create 2 client', done => {
        request(app)
        .post('/client')
        .set('Authorization', `Bearer ${tokenAuth}`)
        .send({name: 'Mariah Doe', email: 'mariah@corp.com',})
        .expect(200)
        .then(response => response.body)
        .then(body => {
            expect(body).to.contain.property('name')
            expect(body).to.contain.property('email')
            expect(body).to.contain.property('_id')

            expect(body.name).to.eq('Mariah Doe')
            expect(body.email).to.eq('mariah@corp.com')
        })
        .then(() => done())
        .catch(done)
    }),

    it('NOK, create client same email', done => {
        request(app)
        .post('/client')
        .set('Authorization', `Bearer ${tokenAuth}`)
        .send({name: 'Jhon Doe', email: 'jhon@corp.com',})
        .expect(500)
        .then(response => response.body)
        .then(body => {
            expect(body).to.contain.property('code')
            expect(body).to.contain.property('errorMessage')

            expect(body.code).to.eq('INVALID_FIELD')
            expect(body.errorMessage).to.eq('Email jhon@corp.com already used')
        })
        .then(() => done())
        .catch(done)
    }),

    it('NOK, create client without name', done => {
        request(app)
        .post('/client')
        .set('Authorization', `Bearer ${tokenAuth}`)
        .send({name: '', email: 'jhon@corp.com',})
        .expect(500)
        .then(response => response.body)
        .then(body => {
            expect(body).to.contain.property('code')
            expect(body).to.contain.property('errorMessage')

            expect(body.code).to.eq('INVALID_FIELD')
            expect(body.errorMessage).to.eq('Invalid value for field client.name')
        })
        .then(() => done())
        .catch(done)
    })

    it('NOK, create client without email', done => {
        request(app)
        .post('/client')
        .set('Authorization', `Bearer ${tokenAuth}`)
        .send({name: 'Jhon Doe', email: '',})
        .expect(500)
        .then(response => response.body)
        .then(body => {
            expect(body).to.contain.property('code')
            expect(body).to.contain.property('errorMessage')

            expect(body.code).to.eq('INVALID_FIELD')
            expect(body.errorMessage).to.eq('Invalid value for field client.email')
        })
        .then(() => done())
        .catch(done)
    })

    it('NOK, create client with invalid email', done => {
        request(app)
        .post('/client')
        .set('Authorization', `Bearer ${tokenAuth}`)
        .send({name: 'Jhon Doe', email: 'jhon.corp',})
        .expect(500)
        .then(response => response.body)
        .then(body => {
            expect(body).to.contain.property('code')
            expect(body).to.contain.property('errorMessage')

            expect(body.code).to.eq('INVALID_FIELD')
            expect(body.errorMessage).to.eq('Invalid format for email jhon.corp')
        })
        .then(() => done())
        .catch(done)
    })

    it('NOK, create client with invalid email', done => {
        request(app)
        .post('/client')
        .set('Authorization', `Bearer ${tokenAuth}`)
        .send({name: 'Jhon Doe', email: 'jhon.corp',})
        .expect(500)
        .then(response => response.body)
        .then(body => {
            expect(body).to.contain.property('code')
            expect(body).to.contain.property('errorMessage')

            expect(body.code).to.eq('INVALID_FIELD')
            expect(body.errorMessage).to.eq('Invalid format for email jhon.corp')
        })
        .then(() => done())
        .catch(done)
    })
})

describe('API => get list client with clients', _ => {
    it('OK, get list of clients', done => {
        request(app)
        .get('/client')
        .set('Authorization', `Bearer ${tokenAuth}`)
        .expect(200)
        .then(response => response.body)
        .then(body => {
            expect(body).to.contain.property('clients')
            expect(body.clients.length).to.eq(2)
        })
        .then(() => done())
        .catch(done)
    })

    it('NOK, unauthorized', done => {
        request(app)
        .get('/client/1')
        .expect(401)
        .then(() => done())
        .catch(done)
    })

    it('NOK, id not exists', done => {
        request(app)
        .get('/client/1')
        .set('Authorization', `Bearer ${tokenAuth}`)
        .expect(404)
        .then(() => done())
        .catch(done)
    })

    it('OK, id exists', done => {
        request(app)
        .get('/client')
        .set('Authorization', `Bearer ${tokenAuth}`)
        .expect(200)
        .then(response => response.body)
        .then(body => body.clients[0]._id)
        .then(id => {
            request(app)
            .get(`/client/${id}`)
            .set('Authorization', `Bearer ${tokenAuth}`)
            .expect(200)
            .then(response => response.body)
            .then(body => {
                expect(body).to.contain.property('_id')
                expect(body._id).to.eq(id)
            })
            .then(_ => done())
        })
        .catch(done)
    })
})

describe('API => delete client', _ => {
    it('NOK, unauthorized', done => {
        request(app)
        .delete('/client/1')
        .expect(401)
        .then(() => done())
        .catch(done)
    })

    it('NOK, id not exists', done => {
        request(app)
        .delete('/client/1')
        .set('Authorization', `Bearer ${tokenAuth}`)
        .expect(404)
        .then(() => done())
        .catch(done)
    })
    
    it('OK, delete client', done => {
        request(app)
        .get('/client')
        .set('Authorization', `Bearer ${tokenAuth}`)
        .expect(200)
        .then(response => response.body)
        .then(body => body.clients[0]._id)
        .then(id => {
            request(app)
            .del(`/client/${id}`)
            .set('Authorization', `Bearer ${tokenAuth}`)
            .expect(200)
            .then(response => response.body)
            .then(body => {
                expect(body).to.contain.property('_id')
                expect(body._id).to.eq(id)
            })
            .then(_ => done())
            .catch(done)
        })
        .catch(done)
    })
})

describe('API => product to client', _ => {
    var clientId = ''
    before(done => {
        request(app)
        .get('/client')
        .set('Authorization', `Bearer ${tokenAuth}`)
        .expect(200)
        .then(response => response.body)
        .then(body => {
            clientId = body.clients[0]._id
        })
        .then(() => done())
        .catch(done)
    });

    it('OK, add valid product', done => {
        request(app)
        .post(`/client/${clientId}/product`)
        .set('Authorization', `Bearer ${tokenAuth}`)
        .send({productId: '1bf0f365-fbdd-4e21-9786-da459d78dd1f',})
        .expect(200)
        .then(response => response.body)
        .then(body => {
            expect(body).to.contain.property('products')
            expect(body.products.length).to.eq(1)
        })
        .then(() => done())
        .catch(done)
    })

    it('NOK, add duplicated product', done => {
        request(app)
        .post(`/client/${clientId}/product`)
        .set('Authorization', `Bearer ${tokenAuth}`)
        .send({productId: '1bf0f365-fbdd-4e21-9786-da459d78dd1f',})
        .expect(500)
        .then(response => response.body)
        .then(body => {
            expect(body.code).to.eq('INVALID_FIELD')
            expect(body.errorMessage).to.eq('Product 1bf0f365-fbdd-4e21-9786-da459d78dd1f already registred')
        })
        .then(() => done())
        .catch(done)
    })

    it('NOK, add product not exists', done => {
        request(app)
        .post(`/client/${clientId}/product`)
        .set('Authorization', `Bearer ${tokenAuth}`)
        .send({productId: '-123b',})
        .expect(500)
        .then(response => response.body)
        .then(body => {
            expect(body.code).to.eq('INVALID_PRODUCT')
            expect(body.errorMessage).to.eq('Product -123b not exists')
        })
        .then(() => done())
        .catch(done)
    })

    it('OK, remove product', done => {
        request(app)
        .del(`/client/${clientId}/product/1bf0f365-fbdd-4e21-9786-da459d78dd1f`)
        .set('Authorization', `Bearer ${tokenAuth}`)
        .expect(200)
        .then(response => response.body)
        .then(body => {
            expect(body).to.contain.property('products')
            expect(body.products.length).to.eq(0)
        })
        .then(() => done())
        .catch(done)
    })

})
