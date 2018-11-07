const mongoose = require('mongoose')
const Posts = mongoose.model('posts')
const Comments = mongoose.model('comments')
const keys = require('../config/keys')
mongoose.connect(keys.mongoURI)

module.exports = app => {
    app.get('/posts/:search', async (req,res) => {
        let array = []
        let commentArray = []
        let search = req.params.search
        if(search===":undefined"){search = ""}
        const file = (search==="*")? "" : search.replace(':','')
        
        try{     
        if(file===""){
            const data = await Posts.find({}, (err)=>{if(err){console.log(err)}}).populate('comments')
            data.forEach(post => {
            post.comments.forEach(comment => {
                const opinion = [comment._id, comment.comment, comment.author, comment.time]
                commentArray.push(opinion)
            })
            const item = [post._id, post.text, post.author, post.time, post.firstName, commentArray]
            array.push(item)
            commentArray = []
            })
        } else {
            const data = await Posts.find({ author: { "$regex": `${file}`} }, (err)=>{if(err){console.log(err)}}).populate('comments').exec(err=>console.log(err))
            const moreData = await Posts.find({ text: { "$regex": `${file}`} }, (err)=>{if(err){console.log(err)}}).populate('comments').exec(err=>console.log(err))
            data.forEach(post => {
            post.comments.forEach(comment => {
                const opinion = [comment._id, comment.comment, comment.author, comment.time]
                commentArray.push(opinion)
            })
            const item = [post._id, post.text, post.author, post.time, post.firstName, commentArray]
            array.push(item)
            commentArray = []
            })
            moreData.forEach(post => {
            commentArray = []
            post.comments.forEach(comment => {
                const opinion = [comment._id, comment.comment, comment.author, comment.time]
                commentArray.push(opinion)
            })
            const item = [post._id, post.text, post.author, post.time, post.firstName, commentArray]
            array.push(item)
            commentArray = []
            })
        }
        if(array.length==0){res.send("No posts have been made yet")}
        res.send(array.reverse())
        } catch(err) {return}
    })

    app.post('/posts/new', (req,res) => {
        new Posts(req.body).save()
    })

    app.get('/posts/find/:id', (req,res) => {
        let find = req.params.id
        find = find.replace(':','')
        Posts.findOne({"_id": find}, (err, post)=>{
            if(err){console.log(err)}
            res.send(post)
        })
    })

    app.post('/posts/edit', (req,res) => {
        const changePost = req.body
        Posts.findOne({ "_id": changePost.post.id }, (err, post)=>{
            if(err){console.log(err)}
            post.text = changePost.post.text
            post.save(() => {if(err){console.log(err)}})
        })
    })

    app.post('/posts/comment/new', (req, res) => {

        Posts.findOne({ "_id": req.body.id}, (err, post)=>{
            if(err){console.log(err)}
            
            Comments.create(req.body.comment, (err, comment)=>{
                if(err){console.log(err)}
                post.comments.push(comment)
                post.save()
            })
        })
    })

    app.post('/posts/delete', (req,res) => {
        Posts.findOne({ "_id": req.body.id }, (err, post)=>{
            if(err){console.log(err)}
            post.comments.forEach(comment => Comments.deleteOne({ "_id": comment._id}, err=>{if(err){console.log(err)}}))
            post.save(err => {if(err){console.log(err)}})
        })
        Posts.deleteOne({ "_id": req.body.id }, err=>{if(err){console.log(err)}})
    })

    app.post('/posts/comment/remove', (req,res) => {
        Posts.findOne({ "comments": req.body.id }, (err, post)=>{
            if(err){console.log(err)}
            post.comments.pull(req.body._id)
            post.save(err => {if(err){console.log(err)}})
        })
        Comments.deleteOne({ "_id": req.body.id }, err=>{if(err){console.log(err)}})
    })
}