import React, { Component } from 'react'
import './Posts.css'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import axios from 'axios'

class Posts extends Component {

    deleteButton = (post) => {
        if(this.props.auth===null){return}
        if(this.props.auth.name===post[2]){
            return <button className="postDelete" onClick={this.handleDelete(post[0])}>Delete</button>
        }
    }

    handleDelete = (id) => () => {
        axios.post('/posts/delete', { id }).then(this.props.loadposts()).catch(
            err => console.log(err))
    }

    editButton = (post) => {
        if(this.props.auth===null){return}
        if(this.props.auth.name===post[2]){
            return <button className="postEdit" onClick={this.handleEdit(post[0])}>Edit</button>
        }
    }

    handleEdit = (id) => () => {
        this.props.editPost(id)
    }

    renderContent() {
        switch (this.props.posts) {
            case null:
                return  <div>
                            <p>Loading...</p>
                        </div>
            default:
                const posts = this.props.posts
                if(posts==="No posts have been made yet"){return (
                <li id="noposts">Nothing found...</li>)}
                const list = posts.map(post => <li className={post[4]} key={post[0]}>
                                                <h4>{post[2]} - {post[3]}:</h4>
                                                <p>{post[1]}</p>
                                                <div className="buttons">
                                                    {this.deleteButton(post)}
                                                    {this.editButton(post)}
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