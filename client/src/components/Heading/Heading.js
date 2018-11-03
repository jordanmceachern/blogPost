import React, { Component } from 'react'
import './Heading.css'
import Header from '../Header/Header'
import Subheader from '../Subheader/Subheader'
import SubheaderM from '../SubheaderM/SubheaderM'
import Hamburger from '../hamburger/hamburger'

class Heading extends Component {
    state = {
        display: false
    }
    
    clickHandler = () => () => {
        this.setState({display: !this.state.display})
    }

    render(){
        let subheader = ""
        if(this.state.display===true){
            subheader = <SubheaderM/>
        }
        return(
            <div id="heading">
                <div id="menu">
                    <Header id="head"/>
                    <div onClick={this.clickHandler()}>
                        <Hamburger id="ham"/>
                    </div>
                </div>
                {subheader}
                <Subheader/>
            </div>
        )
    }
}

export default Heading