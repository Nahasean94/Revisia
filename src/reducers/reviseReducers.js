import {ADD_QUESTION, CLEAR_QUESTIONS, DELETE_QUESTION, UPDATE_QUESTION} from "../actions/types"
import findIndex from "lodash/findIndex"
export default (state = [], action = {}) => {
    switch (action.type) {
        case ADD_QUESTION:
            return [action.payload, ...state]
        case CLEAR_QUESTIONS:
            return []
        case UPDATE_QUESTION:
            return state.map(policy => {
                if (policy._id === action.payload._id) {
                    return action.payload
                }
                return policy
            })
        case DELETE_QUESTION:
            const index = findIndex(state, {_id: action.payload._id})
            if (index => 0) {
                return [...state.slice(0, index), ...state.slice(index + 1)]
            }
            return state
        default:
            return state
    }
}