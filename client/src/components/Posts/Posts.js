import React, { Component } from 'react'
import './Posts.css'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import axios from 'axios'

class Posts extends Component {
    state = {
        comment: "",
        author: ""
    }

    deleteButton = post => {
        if(this.props.auth===false){return}
        if(this.props.auth.name===post[2]){
            return <button className="postDelete" onClick={this.handleDelete(post[0])}>Delete</button>
        }
    }

    handleDelete = id => () => {
        axios.post('/posts/delete', { id }).then(this.props.loadposts()).catch(
            err => console.log(err))
    }

    handleDeleteComment = id => () => {
        axios.post('/posts/comment/remove', { id }).then(this.props.loadposts()).catch(
            err => console.log(err))
    }

    editButton = post => {
        if(this.props.auth===false){return}
        if(this.props.auth.name===post[2]){
            return <button className="postEdit" onClick={this.handleEdit(post[0])}>Edit</button>
        }
    }

    handleEdit = id => () => {
        this.props.editPost(id)
    }

    commentButton = iD => {
        if(this.props.auth===false){return}else{
            return <button className="postComment" onClick={this.toggleShow(`${iD}+1`)}>Comment</button>
        }
    }

    showButton = post => {
        return <button className="showComment" onClick={this.toggleShow(post[0])}>View Comments ({post[5].length})</button>
    }

    toggleShow = iD => () => {
        const comments = document.getElementById(iD)
        if(comments===null){return}else{
        comments.classList.toggle("view")}
    }

    handleChange = event => {
        const comment = event.target.value
        const author = this.props.auth.name
        this.setState({ comment, author })
    }

    handleSubmit = iD => async event => {
        event.preventDefault()

        const date = new Date()
        const time = `${date.toDateString()}, ${date.toLocaleTimeString()}`
        const comment = {
            id: iD,
            comment: {
                comment: this.state.comment,
                author: this.state.author,
                time: time
            }
        }
        try{await axios.post('/posts/comment/new', comment).then(
            this.props.loadposts(),
            this.setState({comment: ""})
        )}
        catch(err) {return console.log(err)}
    }

    deleteComment = comment => {
        if(this.props.auth===false){return}
        if(this.props.auth.name===comment[2]){
            return <button className="commentDelete" onClick={this.handleDeleteComment(comment[0])}>Delete</button>
        }
    }
    editComment = comment => {
        if(this.props.auth===false){return}
        if(this.props.auth.name===comment[2]){
            return <button className="commentEdit" onClick={console.log("yo")}>Edit</button>
        }
    }

    handleComments = post => {
        if(post[5]===null||undefined||""){return}
        const opinions = post[5].map(comment => {return(
            <div className="sub" key={comment[0]}>
                <h4>{comment[2]} - {comment[3]}:</h4>
                <p>{comment[1]}</p>
                <div className="buttons">
                    {this.deleteComment(comment)}
                    {this.editComment(comment)}
                </div>
            </div>)
        })
        return opinions
    }

    renderContent() {
        switch (this.props.posts) {
            case null:
                return  <li id="noposts">Loading...</li>
            default:
                const posts = this.props.posts
                if(posts==="No posts have been made yet"){return (
                <li id="noposts">Nothing found...</li>)}
                const list = posts.map(post => <li key={post[0]}>
                                                    <div className="postHeader">
                                                        <h4>{post[2]} - {post[3]}:</h4>
                                                        <p>{post[1]}</p>
                                                        <div className="buttons">
                                                            {this.deleteButton(post)}
                                                            {this.editButton(post)}
                                                            {this.commentButton(post[0])}
                                                            {this.showButton(post)}
                                                        </div>
                                                    </div>

                                                    <div id={post[0]} className="commentHeader view">
                                                        {this.handleComments(post)}
                                                    </div>

                                                    <div id={`${post[0]}+1`} className="commentForm view">
                                                        <form onSubmit={this.handleSubmit(post[0])}>
                                                            <textarea 
                                                            autoFocus
                                                            name="text"
                                                            placeholder="Write your response here..." 
                                                            onChange={this.handleChange} 
                                                            value={this.state.comment}/>
                                                            <input className="post" type="submit" value="post"/>
                                                        </form>
                                                    </div>
                                                </li>)
                return list
        }
    }

    render(){
        return(
            <ul id="list">
                {this.renderContent()}
            </ul>
        )
    }
}

function mapStateToProps({ posts, auth }) {
    return { posts, auth }
}
export default connect(mapStateToProps, actions)(Posts)