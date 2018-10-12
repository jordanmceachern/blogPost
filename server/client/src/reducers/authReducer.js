import { FETCH_USER } from '../actions/types'

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false //if the payload returns an empty string it's interpreted as a false if statement

        default:
            return state
    }
}