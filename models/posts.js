const mongoose = require('mongoose')
const { Schema } = mongoose

const postSchema = new Schema({
    text: String,
    author: String,
    time: String,
    firstName: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "comments"
        }
    ]
})

mongoose.model('posts', postSchema)