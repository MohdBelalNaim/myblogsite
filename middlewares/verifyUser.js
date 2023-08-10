require('dotenv').config()
const jwt = require('jsonwebtoken')

function verifyUser(req,res,next){
    const bearerToken = req.headers['authorization']
    if(bearerToken){
        const allData = bearerToken.split(" ")
        const finalToken = allData[1]
        jwt.verify(finalToken,process.env.JWT_SECRET,(err,data)=>{
            if(err){
                res.json({error:"Invalid token"})
            }
            else{
                req.user = data
                next()
            }
        })
    }
    else{
        res.json({error:"No token found"})
    }
}

module.exports = verifyUser