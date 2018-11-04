const mongoose = require('mongoose')
const Posts = mongoose.model('posts')
const keys = require('../config/keys')
mongoose.connect(keys.mongoURI)

module.exports = app => {
    app.get('/posts/:search', async (req,res) => {
        let array = []
        let search = req.params.search
        if(search===":undefined"){search = ""}
        const file = (search==="*")? "" : search.replace(':','')
        
        try{     
        if(file===""){
            const data = await Posts.find({}, (err)=>{if(err){console.log(err)}})
            data.forEach(post => {
            const item = [post._id, post.text, post.author, post.time, post.firstName]
            array.push(item)
            })
        } else {
            const data = await Posts.find({ author: { "$regex": `${file}`} }, (err)=>{if(err){console.log(err)}})
            const moreData = await Posts.find({ text: { "$regex": `${file}`} }, (err)=>{if(err){console.log(err)}})
            data.forEach(post => {
            const item = [post._id, post.text, post.author, post.time, post.firstName]
            array.push(item)
            })
            moreData.forEach(post => {
            const item = [post._id, post.text, post.author, post.time, post.firstName]
            array.push(item)
            })
        }

        if(array.length==0){res.send("No posts have been made yet")}
        res.send(array.reverse())
        } catch(err) {return console.log(`error sending collection data: ${err}`)}
    })

    app.post('/posts/new', (req,res) => {
        new Posts(req.body).save()
    })

    app.get('/posts/:id', (req,res) => {
        let find = req.params.id
        find = find.replace(':','')
        Posts.findOne({"_id": find}, (err, post)=>{
            if(err){console.log(err)}
            res.send(post)
        })
    })

    app.post('/posts/edit', (req,res) => {
        const newPost = req.body
        Posts.findOne({ "_id": newPost.id }, (err, post)=>{
            if(err){console.log(err)}
            post.text = newPost.text
            post.save(() => {if(err){console.log(err)}})
        })
    })

    app.post('/posts/delete', (req,res) => {
        Posts.deleteOne({ "_id": req.body.id }, (err)=>{if(err){console.log(err)}})
    })
}