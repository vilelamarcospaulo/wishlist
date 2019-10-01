const expect = require('chai').expect;

app = require('./mock')
require('../../domain/clientWishlist')(app)

describe('add product to client wishlist', _ => {
    it('OK, add product', done => {
         app.domains.wishList.addProduct(1, 'PRD1')
         .then(result => {
            expect(result).to.contain.property('name')
            expect(result).to.contain.property('email')
            expect(result).to.contain.property('products')
    
            expect(result.name).to.eq('teste')
            expect(result.email).to.eq('a@b.com')
            expect(result.products.length).to.eq(2)
            expect(result.products.indexOf('PRD1')).to.not.eq(-1)

            done();
        }).catch(err => done(err))
    }),

    it('FAIL, product already exists', done => {
        app.domains.wishList.addProduct(1, 'SKU123')
        .then(done)
        .catch(err => {
            try{
                expect(err).to.contain.property('code')
                expect(err).to.contain.property('msg')
    
                expect(err.code).to.eq('INVALID_PRODUCT')
                expect(err.msg).to.eq('Product SKU123 already registred')
    
                done()  
            } catch(e) {
                done(e)
            }
        })
    }),

    it('FAIL, product not exists on external API', done => {
        app.domains.wishList.addProduct(1, 'PRD404')
        .then(done)
        .catch(err => {
            try{
                expect(err).to.contain.property('code')
                expect(err).to.contain.property('msg')
    
                expect(err.code).to.eq('INVALID_PRODUCT')
                expect(err.msg).to.eq('Product PRD404 not exists')
    
                done()  
            } catch(e) {
                done(e)
            }
        })
    })
})

describe('remove product to client wishlist', _ => {
    it('OK, remove product', done => {
         app.domains.wishList.removeProduct(1, 'SKU123')
         .then(result => {
            expect(result).to.contain.property('name')
            expect(result).to.contain.property('email')
            expect(result).to.contain.property('products')
    
            expect(result.name).to.eq('teste')
            expect(result.email).to.eq('a@b.com')
            expect(result.products.length).to.eq(0)
            expect(result.products.indexOf('SKU123')).to.eq(-1)

            done();
        }).catch(err => done(err))
    })

    it('OK, remove product client not exists', done => {
        app.domains.wishList.removeProduct(100, 'SKU123')
        .then(result => {
           expect(result).to.eq(null)
           done();
       }).catch(err => done(err))
   })

   it('OK, remove product not exists', done => {
        app.domains.wishList.removeProduct(1, 'PRD1')
        .then(result => {
        expect(result).to.eq(null)
        done();
    }).catch(err => done(err))
})
})
