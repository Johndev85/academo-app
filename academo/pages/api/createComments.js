import { MongoClient } from "mongodb"
import assert from "assert"
import config from "../../config"

const uriUrl = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}${config.MONGO_HOST}`
const dbName = config.MONGO_DATABASE

const client = new MongoClient(uriUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

function createComment(db, comment, callback) {
    const collection = db.collection("comments")
    collection.insertOne({ comment: comment }, callback)
}

export default (req, res) => {
    if (req.method === "POST") {
        client.connect(function (err) {
            assert.strictEqual(err, null)
            console.log("Conectado a MongoDB =>")
            const db = client.db(dbName)
            const comment = req.body.comment

            createComment(db, comment, function (creationResult) {
                if (creationResult.ops.length === 1) {
                    res.status(200).json({ message: "Comentario agregado" })
                    return
                }
            })
        })
    } else {
        res.status(401).json({
            error: true,
            message: "Autenticación fallida",
        })
    }
}
