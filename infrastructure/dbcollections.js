let mongodb = process.env.TEST ? require('mongo-mock') : require('mongodb')
let MongoClient = mongodb.MongoClient;

let url = process.env.MONGO_DB_CONNECTION || 'mongodb://localhost:27017/WishlistDB';

module.exports = async app => {
    try {
        let client = await MongoClient.connect(url, { useNewUrlParser: true })
        let db = client.db()
                
        app.repositories = {}
        app.repositories.client = require('../repositories/clientMongoRepository')(db.collection('client'))
    
        db.on('close', _ => { 
            console.error('MONGODB_DISCONNECTED'); 
            process.exit(1)
        });

    } catch(err) {
        console.error('MONGODB_CONNECTION_ERROR', err)
        process.exit(1)
    }
}