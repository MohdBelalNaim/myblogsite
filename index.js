require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT
const User = require('./models/user')

mongoose.connect(process.env.MONGO_URI)
.then(connected=>console.log("Connected to mongoDB"))
.catch(err=>console.log(err))

app.use(express.json())

app.post("/signup",(req,res)=>{
    const {name,email,password} = req.body
    
    if(!name || !email || !password){
        res.json({error:"All fields are required"})
    }
    else{
        User.findOne({email:email})
        .then(found=>{
            
            if(found){
                res.json({error:"This email is already in use"})
            }

            else{
                const new_user = new User({
                    name:name,
                    email:email,
                    password:password
                })
                new_user.save()
                .then(saved=>res.json({success:"User added"}))
                .catch(err=>console.log(err))
            }

        })
        
    }
    
})





app.listen(port,()=>console.log("App is running on port ",port))

