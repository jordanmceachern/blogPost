import React, { Component } from 'react'
import './Header.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from '../../actions'

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return
            case false:
                return <li><button><a href="/auth/google">Login | Sign up With Google</a></button></li>
            default:
                return <li><a>{this.props.auth.name} |<button onClick={this.props.logout}>Logout</button></a></li>
        }
    }
    
    render() {
        console.log(this.props)
        return (
            <nav>
                <div>
                    <h1 id="AppName"><Link to={'/'}>BlogPost</Link></h1>
                    <ul id="signUpLogin">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth }
} //connect supplies the global state from the redux store, as state, and assigns the auth state (determined by the auth reducer) to the prop auth, using fancy es6 syntax

export default connect(mapStateToProps, actions)(Header)