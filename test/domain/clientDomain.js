const expect = require('chai').expect;
app = require('./mock')

require('../../domain/client')(app)

describe('get list client', _ => {
    it('OK, get list of clients', done => {
         app.domains.client.listClients()
         .then(result => {
            expect(result).to.contain.property('clients')
            expect(result.clients.length).to.eq(1)
            expect(result.clients[0]).to.contain.property('name')
            expect(result.clients[0]).to.contain.property('email')
    
            expect(result.clients[0].name).to.eq('teste')
            expect(result.clients[0].email).to.eq('a@b.com')

            done();
        }).catch(err => done(err))
    })
})

describe('get a client', _ => {
    it('OK, get a client', done => {
         app.domains.client.findClient(1)
         .then(result => {
            expect(result).to.contain.property('name')
            expect(result).to.contain.property('email')
    
            expect(result.name).to.eq('teste')
            expect(result.email).to.eq('a@b.com')

            done();
        }).catch(err => done(err))
    }),

    it('OK, not find client', done => {
        app.domains.client.findClient(11)
        .then(result => {
           expect(result).to.eq(null)

           done();
       }).catch(err => done(err))
   })
})

describe('insert client', _ => {
    it('OK, insert client', done => {
        app.domains.client.createClient({
            'name': 'Jhon Doe',
            'email': 'jhondoe@mail.com'
        })
        .then(result => {
            expect(result).to.contain.property('name')
            expect(result).to.contain.property('email')

            expect(result.name).to.eq('Jhon Doe')
            expect(result.email).to.eq('jhondoe@mail.com')

            done();
       }).catch(err => done(err))
   })

   it('FAIL, client name not informed', done => {
    app.domains.client.createClient({
        'name': '',
        'email': 'jhon.co'
    }).then(result => done(result)).catch(err => {
        try{
            expect(err).to.contain.property('code')
            expect(err).to.contain.property('msg')

            expect(err.code).to.eq('INVALID_FIELD')
            expect(err.msg).to.eq('Invalid value for field client.name')

            done()  
        } catch(e) {
            done(e)
        }
    })})

    it('FAIL, client email not informed', done => {
    app.domains.client.createClient({
        'name': 'Jhon doe',
        'email': ''
    }).then(result => done(result)).catch(err => {
        try{
            expect(err).to.contain.property('code')
            expect(err).to.contain.property('msg')

            expect(err.code).to.eq('INVALID_FIELD')
            expect(err.msg).to.eq('Invalid value for field client.email')

            done()  
        } catch(e) {
            done(e)
        }
    })})

   it('FAIL, client email format', done => {
    app.domains.client.createClient({
        'name': 'Jhon Doe',
        'email': 'jhon.co'
    }).then(result => done(result)).catch(err => {
        try{
            expect(err).to.contain.property('code')
            expect(err).to.contain.property('msg')

            expect(err.code).to.eq('INVALID_EMAIL')
            expect(err.msg).to.eq('Invalid format for email jhon.co')

            done()  
        } catch(e) {
            done(e)
        }
    })})

    it('FAIL, client email already registred', done => {
        app.domains.client.createClient({
            'name': 'Jhon Doe',
            'email': 'jhon@corp.com'
        }).then(result => done(result)).catch(err => {
            try{
                expect(err).to.contain.property('code')
                expect(err).to.contain.property('msg')
    
                expect(err.code).to.eq('INVALID_EMAIL')
                expect(err.msg).to.eq('Email jhon@corp.com already used')
    
                done()  
            } catch(e) {
                done(e)
            }
        })
    })
})


describe('update client', _ => {
    it('OK, update client', done => {
        app.domains.client.updateClient(1, {
            'name': 'Jhon Doe',
            'email': 'jhondoe@mail.com'
        })
        .then(result => {
            expect(result).to.contain.property('name')
            expect(result).to.contain.property('email')

            expect(result.name).to.eq('Jhon Doe')
            expect(result.email).to.eq('jhondoe@mail.com')

            done();
       }).catch(err => done(err))
   })

   it('FAIL, client name not informed', done => {
    app.domains.client.updateClient(1, {
        'name': '',
        'email': 'jhon.co'
    }).then(result => done(result)).catch(err => {
        try{
            expect(err).to.contain.property('code')
            expect(err).to.contain.property('msg')

            expect(err.code).to.eq('INVALID_FIELD')
            expect(err.msg).to.eq('Invalid value for field client.name')

            done()  
        } catch(e) {
            done(e)
        }
    })})

    it('FAIL, client email not informed', done => {
    app.domains.client.updateClient(1, {
        'name': 'Jhon doe',
        'email': ''
    }).then(result => done(result)).catch(err => {
        try{
            expect(err).to.contain.property('code')
            expect(err).to.contain.property('msg')

            expect(err.code).to.eq('INVALID_FIELD')
            expect(err.msg).to.eq('Invalid value for field client.email')

            done()  
        } catch(e) {
            done(e)
        }
    })})

   it('FAIL, client email format', done => {
    app.domains.client.updateClient(1, {
        'name': 'Jhon Doe',
        'email': 'jhon.co'
    }).then(result => done(result)).catch(err => {
        try{
            expect(err).to.contain.property('code')
            expect(err).to.contain.property('msg')

            expect(err.code).to.eq('INVALID_EMAIL')
            expect(err.msg).to.eq('Invalid format for email jhon.co')

            done()  
        } catch(e) {
            done(e)
        }
    })})

    it('FAIL, client email already registred', done => {
        app.domains.client.updateClient(1, {
            'name': 'Jhon Doe',
            'email': 'jhon@corp.com'
        }).then(result => done(result)).catch(err => {
            try{
                expect(err).to.contain.property('code')
                expect(err).to.contain.property('msg')
    
                expect(err.code).to.eq('INVALID_EMAIL')
                expect(err.msg).to.eq('Email jhon@corp.com already used')
    
                done()  
            } catch(e) {
                done(e)
            }
        })
    })
})

describe('delete a client', _ => {
    it('OK, delete a client', done => {
         app.domains.client.deleteClient(1)
         .then(result => {
            expect(result).to.contain.property('name')
            expect(result).to.contain.property('email')
    
            expect(result.name).to.eq('teste')
            expect(result.email).to.eq('a@b.com')

            done();
        }).catch(err => done(err))
    }),

    it('OK, not find client', done => {
        app.domains.client.deleteClient(11)
        .then(result => {
           expect(result).to.eq(null)

           done();
       }).catch(err => done(err))
   })
})
