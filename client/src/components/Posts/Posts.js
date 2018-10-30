import React, { Component } from 'react'
import './Posts.css'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class Posts extends Component {
    renderContent() {
        switch (this.props.posts) {
            case null:
                return  <div>
                            <p>Loading...</p>
                        </div>
            case false:
                return  <div>
                            <p>No posts have been made yet...you could be the first!</p>
                        </div>
            default:
                const posts = this.props.posts
                const list = posts.map(post => <li>
                                                <h4>{post[1]}:</h4>
                                                <p>{post[0]}</p>
                                               </li>)
                return list
        }
    }

    render(){
        return(
            <ul>
                {this.renderContent()}
            </ul>
        )
    }
}

function mapStateToProps({ posts }) {
    return { posts }
}
export default connect(mapStateToProps, actions)(Posts)