const jwt = require('jsonwebtoken')
require('dotenv').config()

const middleware = async (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1]

        if(!token){
            return res.status(401).json({Error:"Token not provided"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.userId = decoded.userId
        next()
    }
    catch(err){
        res.status(500).json({Error:"Invalid Token"})
    }
}

module.exports = middleware