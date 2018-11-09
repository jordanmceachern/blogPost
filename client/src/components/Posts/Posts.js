import React, { Component } from 'react'
import './Posts.css'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import axios from 'axios'

class Posts extends Component {
    state = {
        comment: "",
        author: "",
        id: ""
    }

    componentDidMount() {
        this.props.fetchUser()
    }

    deleteButton = post => {
        if(this.props.auth.name===false||null||undefined||""){return}
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
        if(this.props.auth.name===false||null||undefined||""){return}
        if(this.props.auth.name===post[2]){
            return <button className="postEdit" onClick={this.handleEdit(post[0])}>Edit</button>
        }
    }

    handleEdit = id => () => {
        this.props.editPost(id)
    }

    handleCommentEdit = id => () => {
        this.props.editComment(id)
    }

    showButton = post => {
        return <button className="showComment" onClick={this.toggleShow(post[0])}>View Comments ({post[5].length})</button>
    }

    toggleShow = iD => () => {
        const selection = document.getElementById(iD)
        if(selection===null){return}else{
        selection.classList.toggle("view")} 
    }

    handleChange = event => {
        const comment = event.target.value
        const author = this.props.auth.name
        this.setState({ comment, author })
    }

    handleSubmit = iD => async event => {
        event.preventDefault()

        if(this.state.id!==""){
            const comment = {comment: this.state.comment, id: this.state.id}
            axios.post('/posts/comment/edit', { comment })
            this.props.loadposts()
            this.setState({comment: "", id: ""})
        } else {

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
        catch(err) {return console.log(err)
        }}
    }

    deleteComment = comment => {
        if(this.props.auth.name===false||null||undefined||""){return}
        if(this.props.auth.name===comment[2]){
            return <button className="commentDelete" onClick={this.handleDeleteComment(comment[0])}>Delete</button>
        }
    }
    editComment = comment => {
        if(this.props.auth.name===false||null||undefined||""){return}
        if(this.props.auth.name===comment[2]){
            return <button className="commentEdit" onClick={this.handleCommentEdit(comment[0])}>Edit</button>
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

    handleForm = (id) => {
        if(this.props.auth===false||undefined||null||""){return}else{
            return(
            <div className="bar">
                <form onSubmit={this.handleSubmit(id)}>
                    <textarea 
                    autoFocus
                    name="text"
                    placeholder="Write your response here..." 
                    onChange={this.handleChange} 
                    value={this.state.comment}/>
                    <input className="post" type="submit" value="post"/>
                </form>
            </div>
        )}
    }

    renderContent() {
        switch (this.props.posts) {
            case null:
                return  <li id="noposts">Loading...</li>
            default:
                const posts = this.props.posts
                if(posts==="No posts have been made yet"||null||undefined||false||""){return (
                <li id="noposts">Nothing found...</li>)}else{
                const list = posts.map(post => <li key={post[0]}>
                                                    <div className="postHeader">
                                                        <h4>{post[2]} - {post[3]}:</h4>
                                                        <p>{post[1]}</p>
                                                        <div className="buttons">
                                                            {this.deleteButton(post)}
                                                            {this.editButton(post)}
                                                            {this.showButton(post)}
                                                        </div>
                                                    </div>

                                                    <div id={post[0]} className="view formContainer">
                                                        <div className="commentHeader">
                                                            {this.handleComments(post)}
                                                        </div>

                                                        <div className="commentForm">
                                                            {this.handleForm(post[0])}
                                                        </div>
                                                    </div>
                                                </li>)
                return list
        }}
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.changeComment !== ""){
            const edit = this.props.changeComment
            const comment = edit.comment
            const id = edit._id
            this.props.clearEditComment()
            this.setState({ comment, id })
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

function mapStateToProps({ posts, auth, changeComment }) {
    return { posts, auth, changeComment }
}
export default connect(mapStateToProps, actions)(Posts)