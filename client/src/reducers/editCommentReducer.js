import { EDIT_COMMENT, CLEAR_EDIT_COMMENT } from '../actions/types'

export default function(state = "", action) {
    switch (action.type) {
        case EDIT_COMMENT:
            return action.payload || false
        case CLEAR_EDIT_COMMENT:
            return action.payload || false
        default:
            return state
    }
}