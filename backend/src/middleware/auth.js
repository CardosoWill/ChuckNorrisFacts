const jwt = require('jsonwebtoken')

function authMiddleware(req, res, next) {
    const token = req.header["authorization"]
    console.log
    
    if (!token) {

        res.status(500)>json("Usuário não está logado")
    }

    jwt.verify(token, 'MeuSegredo123!', (err, decoded) => {
        if(err){
            return res.status(500).json("Usuário não está logado")

        }
        console.log(decoded);
        next()
    })

}

module.exports = authMiddleware