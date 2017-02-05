import { revokeTokens } from '../utilities/auth'

export const LOG_OUT = 'LOG_OUT'
export const logOut = () => dispatch => revokeTokens().then(() => dispatch({
    type: LOG_OUT,
}))
