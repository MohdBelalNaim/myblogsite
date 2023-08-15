const router = require('express').Router()
const verify = require('../middlewares/verifyUser')
const Post = require('../models/post')

router.post("/create-post",verify,(req,res)=>{
    const{title,content} = req.body
    if(!title || !content){
        res.json({error:"All fields are required"})
    }
    else{
        const today = new Date()
        const yyyy = today.getFullYear()
        let mm = today.getMonth()+1
        let dd = today.getDate()

        const formattedDate = dd+'-'+mm+'-'+yyyy
    
        const post = new Post({
            title:title,
            content:content,
            postedBy:req.user.email, 
            date:formattedDate
        })
        post.save()
        .then(saved=>res.json({message:"Post added"}))
        .catch(err=>res.json(err))
    }
})

router.post('/all-posts',verify,(req,res)=>{
    Post.find()
    .then(found=>{
        if(found){
            res.json({posts:found})
        }
        else{
            res.json({error:"No posts found"})
        }
    })
})

router.post('/my-posts',verify,(req,res)=>{
    Post.find({postedBy:req.user.email})
    .then(found=>{
        if(found){
            res.json({data:found})
        }
        else{
            res.json({error:"No posts found"})
        }
    })
})

router.post('/delete-post/:id',verify,(req,res)=>{
    const {id} = req.params
    Post.deleteOne({_id:id})
    .then(deleted=>res.json({success:"Post deleted"}))
    .catch(err=>res.json({error:"Post was not deleted"}))

})


module.exports = router