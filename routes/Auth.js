const router = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

router.post("/signup",(req,res)=>{
    
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

router.post("/login",(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        res.json({error:"All fields are required"})
    }
    else{

        User.findOne({email:email})
        .then(found=>{
            if(found){
                if(found.password==password){
                    const token = jwt.sign({email:found.email}, process.env.JWT_SECRET)
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

module.exports = router