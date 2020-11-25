import jwt from "jsonwebtoken"
import config from "../../config"
const jwtSecret = config.JWTSECRET

export default (req, res) => {
    if (req.method === "GET") {
        if (!("token" in req.cookies)) {
            res.status(401).json({ message: "No se puede autenticar" })
            return
        }
        let decoded
        const token = req.cookies.token
        if (token) {
            try {
                decoded = jwt.verify(token, jwtSecret)
            } catch (error) {
                console.log(error)
            }
        }
        if (decoded) {
            res.json(decoded)
            return
        } else {
            res.status(401).json({ message: "No se puede autenticar" })
        }
    }
}
