const validation = require('../helpers/validation')
const errors = require('../helpers/errors')

const validateInput = 
    (client, repository) => 
        validate(client)
        .then(_ => validateEmailAlredyUsed(client, repository))

const validate = async (client) => {
    validation.validateField(client, 'client')()
    .then(validation.validateField(client.name, 'client.name'))
    .then(validation.validateField(client.email, 'client.email')) 
    .then(validateEmalFormat(client.email)) 

    return client
}

const validateEmalFormat = (email) => _ => {
    if(!/\S+@\S+\.\S+/.test(email))
        throw errors.defaultException('INVALID_FIELD', `Invalid format for email ${email}`, '')
    return validation.ok
}

const validateEmailAlredyUsed = async (client, repository) => {
    if(await repository.findOneByEmailAndIdNotEquals(client.id, client.email)) {
        throw errors.defaultException('INVALID_FIELD', `Email ${client.email} already used`, '')
    }

    return client
}

module.exports = {
    validateInput: validateInput
}