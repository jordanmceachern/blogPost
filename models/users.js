const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    googleId: String,
    name: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "posts"
        }
    ]
})

mongoose.model('users', userSchema)