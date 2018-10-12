import React, { Component } from 'react'
import './Header.css'

class Header extends Component {
    render() {
        return (
            <nav>
                <div>
                    <h1 id="AppName">BlogPost</h1>
                    <a id="signUpLogin" href="/auth/google">Login | Sign up With Google</a>
                </div>
            </nav>
        )
    }
}

export default Header