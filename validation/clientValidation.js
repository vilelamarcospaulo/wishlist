const validation = require('../helpers/validation')
const errors = require('../helpers/errors')

const ObjectID = require('mongodb').ObjectID

const validateInput = 
    (client, repository) => 
        validate(client)
        .then(() => validateEmailAlredyUsed(client, repository))

const validate = async (client) => {
    validation.validateField(client, 'client')()
    .then(validation.validateField(client.name, 'client.name'))
    .then(validation.validateField(client.email, 'client.email')) 
    .then(validateEmalFormat(client.email)) 

    return client
}

const validateEmalFormat = (email) => () => {
    if(!/\S+@\S+\.\S+/.test(email))
        throw errors.defaultException('INVALID_FIELD', `Invalid format for email  ${email}`, '')
    return validation.ok
}

const validateEmailAlredyUsed = async (client, repository) => {
    let query = { 'email' : client.email }
    if(client.id) {
        query._id = { '$ne': ObjectID(client.id) } 
    }

    let count = await repository.countDocuments(query)
    if( count > 0) {
        throw errors.defaultException('INVALID_FIELD', `Email ${client.email} already used`, '')
    }

    return client
}

module.exports = {
    validateInput: validateInput
}