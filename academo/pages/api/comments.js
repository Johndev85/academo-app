import { MongoClient } from "mongodb"
import assert from "assert"
import config from "../../config"

const uriUrl = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}${config.MONGO_HOST}`
const dbName = config.MONGO_DATABASE

const client = new MongoClient(uriUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

function findComments(db, callback) {
    const collection = db.collection("comments")
    collection.find({}, callback)
}

export default (req, res) => {
    if (req.method === "GET") {
        client.connect(function (err) {
            assert.strictEqual(err, null)
            console.log("Conectado a MongoDB =>")
            const db = client.db(dbName)
            findComments(db)
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify({ name: "John Doe" }))
        })
    } else {
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify({ name: "John Doe" }))
    }
}
