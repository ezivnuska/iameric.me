const { MongoClient } = require('mongodb')
const config = require('./config')

const uri = process.env.DB_CONNECTION_STRING || config.DB_CONNECTION_STRING
let db = MongoClient
const dbConnect = async () => {
    try {
        if (db) return db
        console.log('Connecting to Mongo DB')
        const client = new MongoClient(uri)
        await client.connetc()
        db = client
        console.log('Connected to DB')
        return db
    } catch (error) {
        console.error('Error connecting to Mongo DB', error)
        throw error
    }
}

module.exports = {
    dbConnect,
}