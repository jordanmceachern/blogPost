import axios from 'axios'
import { FETCH_USER, LOGOUT_USER, FETCH_POSTS, EDIT_POST, CLEAR_EDIT } from './types'

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

export const loadposts = (search) => async dispatch => {
    try{
        if(search===undefined){
        const res = await axios.get('/posts/*')
            dispatch({ type: FETCH_POSTS, payload: res.data})
        } else if(search===""){
            return
        }
        const res = await axios.get(`/posts/:${search}`)
            dispatch({ type: FETCH_POSTS, payload: res.data})
    } catch(err) {return console.log(`error with loadposts: ${err}`)}
}

export const editPost = (id) => async dispatch => {
    try{const res = await axios.get(`/posts/find/:${id}`)
        dispatch({ type: EDIT_POST, payload: res.data})}
    catch(err) {return console.log(err)}
}

export const clearEdit = () => dispatch => {
        dispatch({ type: CLEAR_EDIT, payload: ""})
}