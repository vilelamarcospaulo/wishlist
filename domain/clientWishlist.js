const validation = require('../helpers/validation')
const errors = require('../helpers/errors')

const ObjectID = require('mongodb').ObjectID

module.exports = app => {
    app.domain.wishList = {
        addProduct: addProduct(app.collections.client)(app.integration.product),
        removeProduct: removeProduct(app.collections.client),
    }
}

const findClient = repository => async id => {
    if(!ObjectID.isValid(id)) return null
    return await repository.findOne({_id: new ObjectID(id)})
}

const addProduct = repository => productIntegration => async (clientId, productId) => {
    validateInput(clientId, productId)

    let client = await findClient(repository)(clientId)
    if(!client) return null 

    validateProductAlreadyExists(client, productId)
    await validateProductExists(productIntegration, productId)

    client = addProductToWishList(client, productId)
    client = await updateProductList(repository)(client)

    return client
}


const removeProduct = repository => async (clientId, productId) => {
    validateInput(clientId, productId)

    let client = await findClient(repository)(clientId)
    if(!client) return null 

    if(!client.products || client.products.indexOf(productId) == -1) return null;
    client.products.splice(client.products.indexOf(productId) , 1)

    client = await updateProductList(repository)(client)
    return client
}

const validateInput = (clientId, productId) => {
    validation.validateField(clientId, 'clientId')()
    .then(validation.validateField(productId, 'productId'))
}

const validateProductAlreadyExists = (client, productId) => {
    if((client.products || []).indexOf(productId) > -1) {
        throw errors.defaultException('INVALID_FIELD', `Product ${productId} already registred`, '') 
    } 
}

const validateProductExists = async (productIntegration, productId) => {
    if(!(await productIntegration.find(productId))) {
        throw errors.defaultException('INVALID_PRODUCT', `Product ${productId} not exists`, '') 
    }
}

const addProductToWishList = (client, productId) => {
    products = client.products || []
    products.push(productId)
    client.products = products
    
    return client
}

const updateProductList = repository => async client =>
     (await repository.findOneAndUpdate(
        {_id: new ObjectID(client._id)}, 
        { $set: { 'products' : client.products } }, 
        { returnOriginal : false })).value