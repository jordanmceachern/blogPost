import { LOGOUT_USER } from '../actions/types'

export default function(state = null, action) {
    if (action.type === LOGOUT_USER) {
        state = null
    } else return state
}