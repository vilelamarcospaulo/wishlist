const clientValidation = require('../validation/clientValidation')

module.exports = app => {
    app.domains.client = {
        findClient: findClient(app.repositories.client),
        deleteClient: deleteClient(app.repositories.client),

        listClients: listClients(app.repositories.client),
        createClient: createClient(app.repositories.client),
        updateClient: updateClient(app.repositories.client),
    }
}

const listClients = repository => 
    _ => 
        repository.findAll().then(clients => ({ clients: clients, }))

const createClient = repository => 
    obj => 
        clientValidation.validateInput({name: obj.name, email: obj.email}, repository).then(async client => (await repository.insert(client)))

const findClient = repository => repository.findOne

const updateClient = (repository) => 
    (id, obj) => 
        clientValidation.validateInput({id: id, name: obj.name, email: obj.email}, repository)
        .then(async client => await repository.update(client.id, client))


const deleteClient = repository => repository.remove