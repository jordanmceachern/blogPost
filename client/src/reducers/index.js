import { combineReducers } from 'redux'
import authReducer from './authReducer'
//import logoutReducer from './logoutReducer'

export default combineReducers({
    auth: authReducer
})