import moment from 'moment'
import request from '../utilities/request'
import debug from '../utilities/debug'

let cachedAuth

const saveTokensToLocalStorage = (response) => {
    const tokens = {
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        expiresAt: moment().add(response.expires_in, 'seconds').toISOString(),
    }
    localStorage.setItem('tokens', JSON.stringify(tokens))
    cachedAuth = tokens
    debug('Tokens saved to local storage', tokens)
}

const getTokensFromLocalStorage = () => {
    try {
        const { accessToken, expiresAt, refreshToken } = JSON.parse(localStorage.getItem('tokens'))
        const isExpired = !expiresAt || !moment(expiresAt).isAfter(moment())
        if (isExpired) {
            debug('Tokens expired')
        }
        if (accessToken && !isExpired) {
            return { accessToken, refreshToken }
        }
        return { refreshToken }
    } catch (e) {
        return {}
    }
}

const getTokens = () => {
    if (cachedAuth) {
        const { accessToken, expiresAt, refreshToken } = cachedAuth
        if (accessToken && expiresAt && moment(expiresAt).isAfter(moment())) {
            return { accessToken, refreshToken }
        }
    }
    return getTokensFromLocalStorage()
}

export const signIn = (username, password) =>
    request(`${APP_ENV.appServer}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
            client_id: APP_ENV.clientId,
            client_secret: APP_ENV.clientSecret,
            grant_type: 'password',
        }),
    }).then((response) => {
        saveTokensToLocalStorage(response)
        return response.access_token
    })

let currentRefreshRequest
const refreshAccessToken = (refreshToken) => {
    if (currentRefreshRequest) return currentRefreshRequest
    currentRefreshRequest = request(`${APP_ENV.appServer}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            refresh_token: refreshToken,
            client_id: APP_ENV.clientId,
            client_secret: APP_ENV.clientSecret,
            grant_type: 'refresh_token',
        }),
    })
        .then((response) => {
            debug('Tokens refreshed')
            currentRefreshRequest = null
            saveTokensToLocalStorage(response)
            return response.access_token
        })
        .catch((err) => {
            currentRefreshRequest = null
            throw err
        })
    return currentRefreshRequest
}

export const hasAccessToken = () => {
    const { accessToken } = getTokens()
    return !!accessToken
}

export const getAccessToken = () => {
    const { accessToken, refreshToken } = getTokens()
    if (accessToken) {
        return Promise.resolve(accessToken)
    }
    if (!refreshToken) {
        return Promise.reject()
    }
    return refreshAccessToken(refreshToken)
}

export const revokeTokens = () => {
    const { refreshToken } = getTokens()
    if (!refreshToken) {
        return Promise.resolve()
    }
    return request(`${APP_ENV.appServer}/auth/revoke-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: refreshToken,
            client_id: APP_ENV.clientId,
            client_secret: APP_ENV.clientSecret,
        }),
    }).then(() => {
        debug('Tokens revoked')
    })
}
