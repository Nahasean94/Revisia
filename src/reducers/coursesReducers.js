import {ADD_COURSE, CLEAR_COURSES, DELETE_COURSE, UPDATE_COURSE} from "../actions/types"
import findIndex from "lodash/findIndex"
export default (state = [], action = {}) => {
    switch (action.type) {
        case ADD_COURSE:
            return [action.payload, ...state]
        case CLEAR_COURSES:
            return []
        case UPDATE_COURSE:
            return state.map(policy => {
                if (policy._id === action.payload._id) {
                    return action.payload
                }
                return policy
            })
        case DELETE_COURSE:
            const index = findIndex(state, {_id: action.payload._id})
            if (index => 0) {
                return [...state.slice(0, index), ...state.slice(index + 1)]
            }
            return state
        default:
            return state
    }
}