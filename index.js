require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT
const verifyUser = require('./middlewares/verifyUser')


mongoose.connect(process.env.MONGO_URI)
.then(connected=>console.log("Connected to mongoDB"))
.catch(err=>console.log(err))

app.use(express.json())
app.use(require('./routes/Auth'))
app.use(require('./routes/Post'))


app.post("/verify",verifyUser,(req,res)=>{
    res.json({userData:req.user})
})


app.listen(port,()=>console.log("App is running on port ",port))

