import moment from 'moment'
import request from '../utilities/request'
import debug from '../utilities/debug'

const saveTokensToLocalStorage = (response) => {
    const tokens = {
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        expiresAt: moment().add(response.expires_in, 'seconds').toISOString(),
    }
    localStorage.setItem('tokens', JSON.stringify(tokens))
    debug('Tokens saved to local storage', tokens)
}

const getTokensFromLocalStorage = () => {
    try {
        const { accessToken, expiresAt, refreshToken } = JSON.parse(localStorage.getItem('tokens'))
        if (accessToken && expiresAt && moment(expiresAt).isAfter(moment())) {
            return { accessToken, refreshToken }
        }
        return { refreshToken }
    } catch (e) {
        return {}
    }
}

export const signIn = (username, password) => (
    request(`${GLOBAL_ENV.appServer}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
            client_id: GLOBAL_ENV.clientId,
            client_secret: GLOBAL_ENV.clientSecret,
            grant_type: 'password',
        }),
    })
    .then((response) => {
        saveTokensToLocalStorage(response)
        return response.access_token
    })
)

const refreshTokens = refreshToken => (
    request(`${GLOBAL_ENV.appServer}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            refresh_token: refreshToken,
            client_id: GLOBAL_ENV.clientId,
            client_secret: GLOBAL_ENV.clientSecret,
            grant_type: 'refresh_token',
        }),
    })
    .then((response) => {
        debug('Tokens refreshed')
        saveTokensToLocalStorage(response)
        return response.access_token
    })
)

export const hasAccessToken = () => {
    const { accessToken } = getTokensFromLocalStorage()
    return !!accessToken
}

export const getAccessToken = () => {
    const { accessToken, refreshToken } = getTokensFromLocalStorage()
    if (accessToken) {
        return Promise.resolve(accessToken)
    }
    if (!refreshToken) {
        return Promise.reject()
    }
    return refreshTokens(refreshToken)
}
