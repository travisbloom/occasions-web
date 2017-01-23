import { formatReduxFormErrors, formatGeneralAPIErrors } from './errors'

const API_RESPONSE = {
    graphQLErrors: [
        {
            message: 'error that shouldnt be included',
            data: {
                password: ['first password error'],
                username: ['first username error', 'second username error'],
            },
        },
        {
            message: 'error that shouldnt be included',
            data: {
                password: ['second password error'],
                username: ['third username error'],
            },
        },
        {
            message: 'a general form error',
        },
    ],
}

it('formatGeneralAPIErrors will accurately transform returned error responses', () => {
    expect(formatGeneralAPIErrors(API_RESPONSE)).toEqual([
        'first password error',
        'first username error',
        'second username error',
        'second password error',
        'third username error',
        'a general form error',
    ])
})

it('formatReduxFormErrors will accurately transform returned error responses', () => {
    try {
        formatReduxFormErrors(API_RESPONSE)
    } catch (SubmissionError) {
        expect(SubmissionError.errors).toEqual({
            _error: ['a general form error'],
            password: ['first password error', 'second password error'],
            username: ['first username error', 'second username error', 'third username error'],
        })
    }
})
