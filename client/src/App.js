import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import ImageLoader from './components/imageLoader/imageLoader'
import svg from './oceanlight.svg'
import png from './oceanstill.png'
import mp4 from './ocean.mp4'
import Blog from './components/Blog/Blog'
import Heading from './components/heading/heading'
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
          <ImageLoader svg={svg} png={png} mp4={mp4}/>
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