import React, { Component } from 'react'
import './App.css'
import ImageLoader from './components/imageLoader/imageLoader'
import lightsvg from './supersimplebg.svg'
import svg from './simplebg.svg'
import jpg from './background.jpg'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ImageLoader lightsvg={lightsvg} svg={svg} url={jpg}>
        <div className="App">
          <h1 id="AppName">BlogPost</h1>
          <h2 id="signUpLogin">
            <button>Sign up</button>|
            <button>Login</button>
          </h2>
          <div>
            <ul>
              <li id="title">TO DO:</li>
              <li><hr /></li>
              <li>Google Oauth</li>
              <li>React Router</li>
              <li>Smaller Window w/ Scrolling Blog Feed</li>
              <li>MongoDB</li>
              <li>Schema</li>
            </ul>
          </div>
        </div>
        </ImageLoader>
      </React.Fragment>
    )
  }
}

export default App;
