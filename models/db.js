const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const uri = process.env.DB_HOST;


const db = MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
});

process.on('SIGINT', async () => {
    const client = await db
    client.close()
    console.log('Disconnect from DB')
    process.exit(1)
})

module.exports = db