const {verify} = require('jsonwebtoken')
const {jwtSecret} = require('../config/jwtSecret')

function isAuthenticated(req,res,next)
{
    const authToken = req.headers.authorization

    if(!authToken)
    {
        return res.status(401).end()
    }

    const [,token] = authToken.split(" ")
    //console.log(token)

    try{
        const {sub} = verify(token,jwtSecret)
        req.user_id = sub
        next()
    }
    catch(err)
    {
        console.log(err)
        return res.status(401).end()
    }
}

module.exports = {isAuthenticated}