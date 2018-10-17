import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import ImageLoader from './components/imageLoader/imageLoader'
import lightsvg from './supersimplebg.svg'
import svg from './simplebg.svg'
//import BlurUp from './components/BlurUp/BlurUp'
//import l_jpg from './lightBackground.jpg'
import jpg from './background.jpg'
import Header from './components/Header/Header'
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
          <ImageLoader lightsvg={lightsvg} svg={svg} url={jpg}>
          <Header />
          <Route exact path="/">
            <div id="App">
              <ul>
                <li id="title">Hi! TO DO:</li>
                <li><hr /></li>
                <li>Image flashing</li>
                <li>Smaller Window w/ Scrolling Blog Feed</li>
                <li>Responsive design and collapsing menus</li>
              </ul>
            </div>
          </Route>
          </ImageLoader>
        </div>
      </BrowserRouter>
    )
  }
}

export default connect(null, actions)(App);
