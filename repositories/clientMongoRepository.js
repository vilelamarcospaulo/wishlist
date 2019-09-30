const ObjectID = require('mongodb').ObjectID

module.exports = dbColletion => ({
    findAll: findAll(dbColletion),
    findOne: findOne(dbColletion),
    findOneByEmailAndIdNotEquals: findOneByEmailAndIdNotEquals(dbColletion),
    insert: insert(dbColletion),
    remove: remove(dbColletion),
    update: update(dbColletion),
})

const findAll = dbColletion => _ => dbColletion.find({}).toArray()

const findOne = dbColletion => async id => ObjectID.isValid(id) ?  await dbColletion.findOne({_id: new ObjectID(id)}) : null

const findOneByEmailAndIdNotEquals = dbColletion => async (id, email) => {
    let query = { 'email' : email }
    if(id && ObjectID.isValid(id)) query._id = { '$ne': ObjectID(id) } 
        
    return (await dbColletion.countDocuments(query)) > 0
}

const insert = dbColletion => async client => (await dbColletion.insertOne(client)).ops[0]
const remove = dbColletion => async id => {
    let client = await findOne(dbColletion)(id)
    if(!client) return null

    let result = (await dbColletion.deleteOne({_id: new ObjectID(id)}))
    return client
}

const update = dbColletion => async (id, client) => {
    let setObject = {}
    if(client.name) setObject.name = client.name
    if(client.email) setObject.email = client.email
    if(client.products) setObject.products = client.products

    return (await dbColletion.findOneAndUpdate(
        {_id: new ObjectID(id)}, 
        { $set: setObject }, 
        { returnOriginal : false })
    ).value
}
