import { MongoClient } from "mongodb"
import assert from "assert"
import config from "../../config"
import bcrypt from "bcrypt"
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

function authUser(db, username, password, hash, callback) {
    const collection = db.collection("users")
    bcrypt.compare(password, hash, callback)
}

export default (req, res) => {
    if (req.method === "POST") {
        // login
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
                        message: "Error buscando usuario",
                    })
                    return
                }
                if (!user) {
                    res.status(404).json({
                        error: true,
                        message: "Usuario no encontrado",
                    })
                    return
                } else {
                    // se valida autenticación del usuario
                    authUser(
                        db,
                        username,
                        password,
                        user.password,
                        function (err, match) {
                            if (err) {
                                res.status(500).sjon({
                                    error: true,
                                    message: "Autenticación fallida",
                                })
                            }
                            if (match) {
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
                            } else {
                                res.status(401).json({
                                    error: true,
                                    message: "Autenticación fallida",
                                })
                                return
                            }
                        }
                    )
                }
            })
        })
    } else {
        // manejando algún otro método HTTP
        res.statusCode = 401
        res.end()
    }
}
