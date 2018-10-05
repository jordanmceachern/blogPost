const mongoose = require('mongoose')
const { schema } = mongoose

const userSchema = new schema({
    googleId: String
})

mongoose.model('users', userSchema)