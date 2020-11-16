// dependencies
const mongoose = require('mongoose')
const schema = mongoose.Schema
//post schema
const postSchema = new mongoose.Schema({
    title: String,
    body: String,
})

//create mongoose model
const Post = mongoose.model('Post', postSchema)

//exports
module.exports = Post