import axios from 'axios'
import { FETCH_USER, LOGOUT_USER, FETCH_POSTS } from './types'

export const fetchUser = () => async dispatch => {
    try{const res = await axios.get('/api/current_user')
        dispatch({ type: FETCH_USER, payload: res.data})}
    catch(err) {return console.log(err)}
}

export const logout = () => async dispatch => {
    try{const res = await axios.get('/api/logout')
        dispatch({ type: LOGOUT_USER, payload: res.data})}
    catch(err) {return console.log(err)}
}

export const loadposts = () => async dispatch => {
    try{const res = await axios.get('/posts')
        dispatch({ type: FETCH_POSTS, payload: res.data})}
    catch(err) {return console.log(`error dispatching data to reducer: ${err}`)}
}