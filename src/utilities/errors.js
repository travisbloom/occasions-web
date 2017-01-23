import { SubmissionError } from 'redux-form'

export const responseHasErrors = response => !!response.graphQLErrors

export const formatGeneralAPIErrors = (response) => {
    if (!responseHasErrors(response)) return null
    return response.graphQLErrors.reduce((accum, { message, data }) => {
        if (!data) {
            accum.push(message)
            return accum
        }
        Object.keys(data).forEach((key) => {
            data[key].forEach(keyMessage => accum.push(keyMessage))
        })
        return accum
    }, [])
}

/* eslint-disable no-underscore-dangle, no-param-reassign */
export const formatReduxFormErrors = (response) => {
    if (!responseHasErrors(response)) return null

    const errors = response.graphQLErrors.reduce((accum, { message, data }) => {
        if (!data) {
            accum._error = accum._error.concat(message)
            return accum
        }
        Object.keys(data).forEach((key) => {
            if (!accum[key]) {
                accum[key] = []
            }
            accum[key] = accum[key].concat(data[key])
        })
        return accum
    }, { _error: [] })

    throw new SubmissionError(errors)
}
/* eslint-enable no-underscore-dangle, no-param-reassign */
