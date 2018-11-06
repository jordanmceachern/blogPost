const mongoose = require('mongoose')
const { Schema } = mongoose

const commentSchema = new Schema({
    text: String,
    author: String,
    time: String
})

mongoose.model('comments', commentSchema)