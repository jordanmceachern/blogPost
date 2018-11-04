import { EDIT_POST, CLEAR_EDIT } from '../actions/types'

export default function(state = "", action) {
    switch (action.type) {
        case EDIT_POST:
            return action.payload || false
        case CLEAR_EDIT:
            return action.payload || false
        default:
            return state
    }
}