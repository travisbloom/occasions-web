import { CLOSE_ERROR } from '../actions/alerts'
import { formatRemoteErrors } from '../utilities/errors'

const initialState = {
    errors: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
    case 'APOLLO_MUTATION_ERROR':
    case 'APOLLO_QUERY_ERROR': {
        if (action.mutationId) {
            return state
        }
        const message = action.error && action.error.message
        if (!message) return state
        return {
            ...state,
            errors: [...state.errors, message],
        }
    }
    case 'APOLLO_QUERY_RESULT':
        if (!action.result.errors) return state
        return {
            ...state,
            errors: [...state.errors, ...formatRemoteErrors(action.result.errors)],
        }
    case CLOSE_ERROR:
        return {
            ...state,
            errors: [
                ...state.errors.slice(0, action.payload),
                ...state.errors.slice(action.payload + 1),
            ],
        }
    default:
        return state
    }
}
