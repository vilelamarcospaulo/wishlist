const mockedRepository = {
    findOne: id => new Promise((ok, nok) => id === 1 ? ok({
        'name': 'teste',
        'email': 'a@b.com',
        'products': [ 'SKU123' ]
    }) : ok(null)),

    findAll: _ => new Promise((ok, nok) => ok([{
        'name': 'teste',
        'email': 'a@b.com',
    }])),

    insert: object => new Promise((ok, nok) => ok(object)),
    update: (_, object) => new Promise((ok, nok) => ok(object)),
    remove: id => new Promise((ok, nok) => id === 1 ? ok({
        'name': 'teste',
        'email': 'a@b.com',
    }) : ok(null)),

    findOneByEmailAndIdNotEquals: (_, email) => new Promise((ok, nok) => email == 'jhon@corp.com' ? ok(true) : ok(false)),
}

const mockedIntegration = {
    find: id => new Promise((ok, nok) => id === 'PRD404' ? ok(false) : ok(true))
}

const app = {
    domains: {},
    integrations: {
        product: mockedIntegration
    },
    repositories: {
        client: mockedRepository,
    },
}

module.exports = app