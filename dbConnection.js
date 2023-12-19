const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://liao295246318:Abc123456@cluster0.a2kctme.mongodb.net/";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

client.connect();

module.exports = client;