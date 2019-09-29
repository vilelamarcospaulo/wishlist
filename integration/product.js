const axios = require('axios');

module.exports = app => {
    app.integration.product = {
        find: find,
    }
}

process.env.PRODUCT_API_BASE_URL = 'http://challenge-api.luizalabs.com'
process.env.PRODUCT_API_PATH = 'api/product'

const find = async productId => {
    let urlRequest = `${process.env.PRODUCT_API_BASE_URL}/${process.env.PRODUCT_API_PATH}/${productId}`
    try{
        let response = await axios.get(urlRequest)        
        return response.status == 200 ? response.data : null
    } catch(err) {
        return null
    }
}