const mongoose = require('mongoose')
const { Schema } = mongoose

const postSchema = new Schema({
    text: String,
    author: String
})

mongoose.model('posts', postSchema)