const mongoose = require('mongoose')

const Post = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    postedBy:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:false
    }
})

module.exports = mongoose.model('Post',Post)