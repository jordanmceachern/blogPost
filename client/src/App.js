import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import ImageLoader from './components/imageLoader/imageLoader'
import svg from './background.svg'
import jpg from './background.jpg'
import Blog from './components/Blog/Blog'
import Heading from './components/Heading/Heading'
import { connect } from 'react-redux'
import * as actions from './actions'

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <ImageLoader svg={svg} jpg={jpg}/>
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

export default connect(null, actions)(App)