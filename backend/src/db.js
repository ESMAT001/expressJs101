const { MongoClient } = require("mongodb")


const uri = 'mongodb://127.0.0.1:27017'

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


module.exports = async function connectToDb(dbName) {
    try {
        await client.connect();
        const db = client.db(dbName);
        await db.command({ ping: 1 });
        console.log("Connected successfully to db server");
        return {
            db,
            async close() {
                await client.close();
                console.log('db connection closed')
            }
        }
    } catch (err) {
        await client.close();
    }
}
