import React, { Component } from 'react'
import './Posts.css'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import axios from 'axios'

class Posts extends Component {
    state = {
        comment: ""
    }

    deleteButton = post => {
        if(this.props.auth===null){return}
        if(this.props.auth.name===post[2]){
            return <button className="postDelete" onClick={this.handleDelete(post[0])}>Delete</button>
        }
    }

    handleDelete = id => () => {
        axios.post('/posts/delete', { id }).then(this.props.loadposts()).catch(
            err => console.log(err))
    }

    editButton = post => {
        if(this.props.auth===null){return}
        if(this.props.auth.name===post[2]){
            return <button className="postEdit" onClick={this.handleEdit(post[0])}>Edit</button>
        }
    }

    handleEdit = id => () => {
        this.props.editPost(id)
    }

    commentButton = iD => {
        if(this.props.auth===null){return}else{
            return <button className="postComment" onClick={this.toggleShow(`${iD}+1`)}>Comment</button>
        }
    }

    showButton = iD => {
        return <button className="showComment" onClick={this.toggleShow(iD)}>View Comments</button>
    }

    toggleShow = iD => () => {
        const comments = document.getElementById(iD)
        if(comments===null){return}else{
        comments.classList.toggle("view")}
    }

    handleChange = event => {
        const comment = event.target.value
        this.setState({ comment })
    }

    handleSubmit = event => {
        event.preventDefault()
        console.log("yo")
        //axios.post('/posts/comment', { id }).then(this.props.loadposts()).catch(
          //  err => console.log(err))
    }

    deleteComment = post => {
        if(this.props.auth===null){return}
        if(this.props.auth.name===post[2]){
            return <button className="commentDelete" onClick={console.log("yo")}>Delete</button>
        }
    }
    editComment = post => {
        if(this.props.auth===null){return}
        if(this.props.auth.name===post[2]){
            return <button className="commentEdit" onClick={console.log("yo")}>Edit</button>
        }
    }

    renderContent() {
        switch (this.props.posts) {
            case null:
                return  <div>
                            <p>Loading...</p>
                        </div>
            default:
                const posts = this.props.posts
                //const comments = //this.props.comments
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
                                                            {this.showButton(post[0])}
                                                        </div>
                                                    </div>

                                                    <div id={post[0]} className="commentHeader view">
                                                        <div className="sub">
                                                            <h4>Name - Date and Time:</h4>
                                                            <p>Comment</p>
                                                            <div className="buttons">
                                                                {this.deleteComment(post)}
                                                                {this.editComment(post)}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div id={`${post[0]}+1`} className="commentForm view">
                                                        <form onSubmit={this.handleSubmit}>
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