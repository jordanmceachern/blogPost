const mongoose = require('mongoose')
const { Schema } = mongoose

const commentSchema = new Schema({
    comment: String,
    author: String,
    time: String
})

mongoose.model('comments', commentSchema)