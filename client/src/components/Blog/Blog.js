import React, { Component } from 'react'
import './Blog.css'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class Blog extends Component {
    componentDidMount() {
        this.props.loadposts()
    }

    render(){
        const posts = this.props.posts
        console.log(posts)
        return(
            <div id="spacer">
                <div id="Blog">
                    <p>
                        {posts}
                    </p>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ posts }) {
    return { posts }
}
export default connect(mapStateToProps, actions)(Blog)