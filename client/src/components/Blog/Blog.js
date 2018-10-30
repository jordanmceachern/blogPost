import React, { Component } from 'react'
import './Blog.css'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import axios from 'axios'
import Posts from '../Posts/Posts'

class Blog extends Component {
    state = {
        text: "",
        author: ""
    }

    componentDidMount() {
        this.props.loadposts()
    }

    handleChange = event => {
        const text = event.target.value
        const author = this.props.auth.name
        this.setState({ text, author })
    }

    handleSubmit = async event => {
        event.preventDefault()
        const post = {
            text: this.state.text,
            author: this.state.author
        }
        try{await axios.post('/posts/new', post)}
        catch(err) {return console.log(err)
        }
    }

    renderContent() {
        switch (this.props.auth) {
            case null:
                return
            case false:
                return <div id="post">
                            <p id="wantPost">Sign up or login to submit a post</p>
                        </div>
            default:
                return <div id="postForm">
                            <p id="makePost">What's on your mind?</p>
                            <div id="form">
                                <form onSubmit={this.handleSubmit}>
                                    <textarea name="text" placeholder="Write your thoughts here..." onChange={this.handleChange}/>
                                    <input type="submit" value="post"/>
                                </form>
                            </div>
                        </div>
        }
    }

    render(){
        return(
            <div id="spacer">
                <div id="Blog">
                    {this.renderContent()}
                    <div id="posts">
                        <Posts />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth }
}
export default connect(mapStateToProps, actions)(Blog)