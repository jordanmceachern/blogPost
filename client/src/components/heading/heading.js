import React from 'react'
import './heading.css'
import Header from '../Header/Header'
import Subheader from '../Subheader/Subheader'

const heading = () => {
    return(
        <div id="heading">
            <Header id="head"/>
            <Subheader id="subhead"/>
        </div>
    )
}

export default heading