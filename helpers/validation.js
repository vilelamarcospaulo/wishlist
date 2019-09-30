const errors = require('./errors')

const ok = {
    then: (validator) => validator(),
}

const validateField = (field, fieldName) => _ => {
    if(!field)
        throw errors.defaultException('INVALID_FIELD', `Invalid value for field ${fieldName}`, '')
    return ok
}

module.exports = {
    ok: ok,
    validateField: validateField
}