import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import reduxThunk from 'redux-thunk'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const reduxStore = createStore(() => reducers, {}, applyMiddleware(reduxThunk))

ReactDOM.render(<Provider store={reduxStore}><App /></Provider>, document.getElementById('root'))
registerServiceWorker()
