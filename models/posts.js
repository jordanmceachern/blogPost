const mongoose = require('mongoose')
const { Schema } = mongoose

const postSchema = new Schema({
    text: String,
    author: String,
    time: String,
    firstName: String
})

mongoose.model('posts', postSchema)