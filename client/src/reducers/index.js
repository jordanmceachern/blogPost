import { combineReducers } from 'redux'
import authReducer from './authReducer'
import postsReducer from './postsReducer'
import editPostReducer from './editPostReducer'
import editCommentReducer from './editCommentReducer'

export default combineReducers({
    auth: authReducer,
    posts: postsReducer,
    changePost: editPostReducer,
    changeComment: editCommentReducer
})