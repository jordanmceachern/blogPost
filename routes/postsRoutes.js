const mongoose = require('mongoose')
const Posts = mongoose.model('posts')
const keys = require('../config/keys')
mongoose.connect(keys.mongoURI)

module.exports = app => {
    app.get('/posts', async (req,res) => {
        let array = []
        //Posts.find({}, err => {
          //  if(err){console.log(err)}
            //}).then(collection => collection.forEach(post => array.push(post.text))).then(res.send(array))
        try{const data = await Posts.find({}, (err)=>{if(err){console.log(err)}})
        data.forEach(post => {
            const item = [post.text, post.author]
            array.push(item)
        })
        res.send(array)
        } catch(err) {return console.log(`error sending collection data: ${err}`)}
    })

    //let array = []
      //  let item = {text: "",author: ""}
        //try{const data = await Posts.find({}, (err)=>console.log(err))
          // console.log(`data returned from collection: ${data}`)
        //data.forEach((post, err) => {
          //  item[text] = post.text
            //item[author] = post.author
            //array.push(item)
            //console.log(`error pushing the data to array: ${err}`)
            //}, () => res.send(array)
        //)} catch(err) {return console.log(`error sending collection data: ${err}`)}

    app.post('/posts/new', (req,res) => {
        new Posts(req.body).save()
    })
}