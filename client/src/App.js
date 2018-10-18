import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import ImageLoader from './components/imageLoader/imageLoader'
import lightsvg from './supersimplebg.svg'
import svg from './simplebg.svg'
//import BlurUp from './components/BlurUp/BlurUp'
//import l_jpg from './lightBackground.jpg'
import jpg from './background.jpg'
import Blog from './components/Blog/Blog'
import Heading from './components/heading/heading'
import { connect } from 'react-redux'
import * as actions from './actions'

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }
  //<BlurUp placeholderURL={l_jpg} url={jpg} aspectRatio="6:4" />
  render() {
    return (
      <BrowserRouter>
        <div>
          <ImageLoader lightsvg={lightsvg} svg={svg} url={jpg}/>
          <Route exact path="/">
            <div id="container">
              <Heading />
              <Blog />
            </div>
          </Route>
        </div>
      </BrowserRouter>
    )
  }
}

export default connect(null, actions)(App);
