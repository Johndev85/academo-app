import { MongoClient } from "mongodb"
import assert from "assert"
import config from "../../config"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"
import jwt from "jsonwebtoken"

const jwtSecret = config.JWTSECRET

const saltRounds = 10
const uriUrl = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}${config.MONGO_HOST}`
const dbName = config.MONGO_DATABASE

const client = new MongoClient(uriUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

function findUser(db, username, callback) {
    const collection = db.collection("users")
    collection.findOne({ username }, callback)
}

function createUser(db, username, password, callback) {
    const collection = db.collection("users")
    bcrypt.hash(password, saltRounds, function (err, hash) {
        // almacenando hash conn el password en la DB
        collection.insertOne(
            {
                userId: uuidv4(),
                username: username,
                password: hash,
            },
            function (err, userCreated) {
                assert.strictEqual(err, null)
                callback(userCreated)
            }
        )
    })
}

export default (req, res) => {
    if (req.method === "POST") {
        //registro - verificando  que el usuario no exista ya.
        client.connect(function (err) {
            assert.strictEqual(err, null)
            console.log("Conectado a MongoDB =>")
            const db = client.db(dbName)
            const username = req.body.username
            const password = req.body.password

            findUser(db, username, function (err, user) {
                if (err) {
                    res.status(500).json({
                        error: true,
                        message: "Error, usuario no encontrado",
                    })
                    return
                }
                if (!user) {
                    // se crea usuario nuevo
                    createUser(
                        db,
                        username,
                        password,
                        function (creationResult) {
                            if (creationResult.ops.length === 1) {
                                const user = creationResult.ops[0]
                                const token = jwt.sign(
                                    {
                                        userId: user.userId,
                                        username: user.username,
                                    },
                                    jwtSecret,
                                    {
                                        expiresIn: 3000,
                                    }
                                )
                                res.status(200).json({ token })
                                return
                            }
                        }
                    )
                } else {
                    // el usuario existe
                    res.status(403).json({
                        error: true,
                        message: "El usuario ya existe.",
                    })
                    return
                }
            })
        })
    } else {
        // Handle any other HTTP method
        res.status(200).json({ users: ["John Doe"] })
    }
}
