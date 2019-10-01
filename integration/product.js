const axios = require('axios');

module.exports = app => {
    app.integrations.product = {
        find: find,
    }
}

const find = async productId => {
    let urlRequest = `${process.env.PRODUCT_API_BASE_URL}/${process.env.PRODUCT_API_PATH}/${productId}`
    try{
        let response = await axios.get(urlRequest)        
        return response.status == 200
    } catch(err) {
        return false
    }
}