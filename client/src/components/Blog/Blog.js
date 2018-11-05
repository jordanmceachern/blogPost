import React, { Component } from 'react'
import './Blog.css'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import axios from 'axios'
import Posts from '../Posts/Posts'

class Blog extends Component {
    state = {
        id: "",
        text: "",
        author: "",
        first: ""
    }

    componentDidMount() {
        this.props.loadposts()
    }

    handleChange = async event => {
        const text = event.target.value
        const author = this.props.auth.name
        const first = this.props.auth.firstName
        this.setState({ text, author, first })
    }

    handleSubmit = async event => {
        if(this.state.text===""){return}else{
        event.preventDefault()

        if(this.state.id!==""){
            const post = {text: this.state.text, id: this.state.id}
            axios.post('/posts/edit', { post })
            this.props.loadposts()
            this.setState({text: "", id: ""})
        } else {

        const date = new Date()
        const post = {
            text: this.state.text,
            author: this.state.author,
            time: `(${date.toDateString()}, ${date.toLocaleTimeString()})`,
            firstName: this.state.first 
        }
        try{await axios.post('/posts/new', post).then(
            this.props.loadposts(),
            this.setState({text: ""})
        )}
        catch(err) {return console.log(err)
        }}}
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
                            <p id="makePost">Share a thought.</p>
                            <div id="form">
                                <form onSubmit={this.handleSubmit}>
                                    <textarea name="text" placeholder="Write your thoughts here..." 
                                    onChange={this.handleChange} value={this.state.text}/>
                                    <input type="submit" value="post"/>
                                </form>
                            </div>
                        </div>
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.changePost !== ""){
            const edit = this.props.changePost
            const text = edit.text
            const id = edit._id
            this.props.clearEdit()
            this.setState({ text, id })
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

function mapStateToProps({ auth, changePost }) {
    return { auth, changePost }
}
export default connect(mapStateToProps, actions)(Blog)