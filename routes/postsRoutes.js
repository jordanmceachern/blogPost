const mongoose = require('mongoose')
const Posts = mongoose.model('posts')

module.exports = app => {
    app.get('/posts', (req,res) => {
        res.send("This will be where the list of posts is displayed")
        //res.send(Posts)
        //console.log(Posts)
    })
}