let MongoClient = require(`mongodb`).MongoClient;


let address = process.env.MONGO_ADDRESS || `localhost`
let port = process.env.MONGO_PORT || `27017`
let db_name = process.env.MONGO_DB_NAME || `WishlistDB`
let url = process.env.MONGO_DB_CONNECTION || `mongodb://${address}:${port}/${db_name}`;

module.exports = (app) => {
    MongoClient.connect(url, { useNewUrlParser: true })
    .then(client => {
        let db = client.db()
        
        app.collections = {}
        app.collections.client = db.collection(`client`);

        db.on('close', () => { 
            console.error('MONGODB_DISCONNECTED'); 
            process.exit(1)
        });
    }) 
    .catch(err => { 
        console.error(`MONGODB_CONNECTION_ERROR`, err)
        process.exit(1)
    } )
}