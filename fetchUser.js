const JWT_SECRET = "PROJECTFORME"
const jwt = require('jsonwebtoken') 

fetchUser = (req, res, next)=>{
    //Get the user from the jwt and token and add id to req object

    
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
    try{
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
        next()
    }catch{
        res.status(401).send({error: "Please authenticate using a valid token"})
    }

}

module.exports = fetchUser