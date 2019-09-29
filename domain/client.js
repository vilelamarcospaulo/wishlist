const clientValidation = require('../validation/clientValidation')
const ObjectID = require('mongodb').ObjectID

module.exports = app => {
    app.domain.client = {
        findClient: findClient(app.collections.client),
        deleteClient: deleteClient(app.collections.client),

        listClients: listClients(app.collections.client),
        createClient: createClient(app.collections.client),
        updateClient: updateClient(app.collections.client),
    }
}

const listClients = repository => _ => repository.find({}, { name: 1, email: 1 }).toArray().then(clients => ({ clients: clients, }))

const createClient = repository => obj => clientValidation.validateInput({name: obj.name, email: obj.email}, repository).then(async client => (await repository.insertOne(client)).ops[0])

const findClient = repository => async id => {
    if(!ObjectID.isValid(id))
        return null
    
    return await repository.findOne({_id: new ObjectID(id)})
}

const updateClient = (repository) => (id, obj) => 
    !ObjectID.isValid(id) ? null :
    clientValidation.validateInput({id: id, name: obj.name, email: obj.email}, repository)
    .then(client => repository.findOneAndUpdate(
            {_id: new ObjectID(client.id)}, 
            { $set: { 'name' : client.name, 'email' : client.email } }, 
            { returnOriginal : false }))
    .then(updated => updated.value)

const deleteClient = repository => async id => {
    let client = await findClient(repository)(id)
    if(!client) { return null }

    (await repository.deleteOne({_id: new ObjectID(id)}))
    return client
}
