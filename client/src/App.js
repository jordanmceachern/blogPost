import React, { Component } from 'react'
//import { BrowserRouter, Route } from 'react-router-dom'
//import './App.css'
//import ImageLoader from './components/imageLoader/imageLoader'
//import lightsvg from './supersimplebg.svg'
//import svg from './simplebg.svg'
//import BlurUp from './components/BlurUp/BlurUp'
//import l_jpg from './lightBackground.jpg'
//import jpg from './background.jpg'
//import Header from './components/Header/Header'
//import Blog from './components/Blog/Blog'
//import Subheader from './components/Subheader/Subheader'
import { connect } from 'react-redux'
import * as actions from './actions'

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }
  //<BlurUp placeholderURL={l_jpg} url={jpg} aspectRatio="6:4" />
  render() {
    return (
        <div>
          <h2>Test test test</h2>
        </div>
    )
  }
}

export default connect(null, actions)(App);
