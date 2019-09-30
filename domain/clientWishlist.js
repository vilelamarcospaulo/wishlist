const validation = require('../helpers/validation')
const errors = require('../helpers/errors')

module.exports = app => {
    app.domains.wishList = {
        addProduct: addProduct(app.repositories.client)(app.integrations.product),
        removeProduct: removeProduct(app.repositories.client),
    }
}

const addProduct = repository => productIntegration => async (clientId, productId) => {
    validateInput(clientId, productId)
    
    let client = await repository.findOne(clientId)
    if(!client) return null 

    validateProductAlreadyExists(client, productId)
    await validateProductExists(productIntegration, productId)

    client = addProductToWishList(client, productId)
    client = await repository.update(clientId, client)
    
    return client
}


const removeProduct = repository => async (clientId, productId) => {
    validateInput(clientId, productId)

    let client = await repository.findOne(clientId)
    if(!client) return null 

    if(!client.products || client.products.indexOf(productId) == -1) return null;
    client.products.splice(client.products.indexOf(productId) , 1)

    client = await repository.update(clientId, client)
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