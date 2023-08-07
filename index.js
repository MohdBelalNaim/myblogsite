require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT
const User = require('./models/user')
const jwt = require('jsonwebtoken')

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
               res.json(found)
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

app.post("/login",(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        res.json({error:"All fields are required"})
    }
    else{

        User.findOne({email:email})
        .then(found=>{
            if(found){
                if(found.password==password){
                    const token = jwt.sign({email:found.email},process.env.JWT_SECRET)
                    res.json({token:token})
                }
                else{
                    res.json({error:"Invalid credentials"})
                }
            }
            else{
                res.json({error:"This email is not registered"})
            }
        })

    }
})

//token is generated while logging in
//-> To validate the user
//-> To manipulate th content using authorized methods



//post data, post title, user who posted 
// post data, post title -> provided by user
// user who posted -> token
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 


app.listen(port,()=>console.log("App is running on port ",port))

