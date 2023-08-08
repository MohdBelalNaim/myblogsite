function verifyUser(req,res,next){
    console.log("Middleware executed")
    next()
}

module.exports = verifyUser