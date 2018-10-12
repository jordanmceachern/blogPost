import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
//import ImageLoader from './components/imageLoader/imageLoader'
//import lightsvg from './supersimplebg.svg'
//import svg from './simplebg.svg'
import BlurUp from './components/BlurUp/BlurUp'
import l_jpg from './lightBackground.jpg'
import jpg from './background.jpg'
import Header from './components/Header/Header'
import { connect } from 'react-redux'
import * as actions from './actions'

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }
  //<ImageLoader lightsvg={lightsvg} svg={svg} url={jpg}>
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path="/">
              <div id="App">
                  <div id="background">
                    <BlurUp
                      placeholderURL={l_jpg}
                      url={jpg}
                      aspectRatio="6:4" />
                  </div>
                <ul>
                  <li id="title">TO DO:</li>
                  <li><hr /></li>
                  <li>Google Oauth</li>
                  <li>React Router</li>
                  <li>MongoDB/ Mongoose</li>
                  <li>Image flashing</li>
                  <li>Redux, actions, and reducers</li>
                  <li>Smaller Window w/ Scrolling Blog Feed</li>
                  <li>Responsive design and collapsing menus</li>
                </ul>
              </div>
          </Route>
        </div>
      </Router>
    )
  }
}

export default connect(null, actions)(App);
