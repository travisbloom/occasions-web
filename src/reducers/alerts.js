import { CLOSE_ERROR } from '../actions/alerts'
import { formatRemoteErrors } from '../utilities/errors'

const initialState = {
    errors: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
    case ('APOLLO_QUERY_RESULT'):
        if (!action.result.errors) return state
        return {
            ...state,
            errors: [
                ...state.errors,
                ...formatRemoteErrors(action.result.errors),
            ],
        }
    case (CLOSE_ERROR):
        return {
            ...state,
            errors: [
                ...state.errors.slice(0, action.payload),
                ...state.errors.slice(action.payload + 1),
            ],
        }
    default: return state
    }
}
