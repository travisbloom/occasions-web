import ApolloClient, { HTTPFetchNetworkInterface, toIdValue } from 'apollo-client'

import urls from './urls'
import { getAccessToken, hasAccessToken } from './utilities/auth'
import debug from './utilities/debug'

/* eslint-disable no-underscore-dangle */
class NetworkInterface extends HTTPFetchNetworkInterface {
    setUri(uri) {
        this._uri = uri
    }
}
/* eslint-enable no-underscore-dangle */

export default ({ history }) => {
    const gqlUrl = hasAccessToken()
        ? `${APP_ENV.appServer}/graphql`
        : `${APP_ENV.appServer}/graphql_public`

    const networkInterface = new NetworkInterface(gqlUrl, {
        credentials: 'same-origin',
        headers: window.__nightmare && { 'X-Has-Mock-User': 'true' },
    })

    /* eslint-disable no-param-reassign */
    networkInterface.use([
        {
            applyMiddleware(req, next) {
                if (window.__nightmare) {
                    next()
                    return
                }
                getAccessToken()
                    .then(accessToken => {
                        if (!req.options.headers) {
                            req.options.headers = {}
                        }
                        req.options.headers.Authorization = `Bearer ${accessToken}`
                        debug('Apollo request', req)
                        next()
                    })
                    .catch(() => {
                        debug('Apollo failed to fetch tokens')
                        if (window.location.pathname === urls.signIn()) {
                            next()
                        } else {
                            history.push(urls.signIn())
                        }
                    })
            },
        },
    ])
    networkInterface.useAfter([
        {
            applyAfterware({ response }, next) {
                if (response.status === 403) {
                    history.push(urls.signIn())
                } else {
                    next()
                }
            },
        },
    ])
    /* eslint-enable no-param-reassign */

    const dataIdFromObject = result => result.id

    return new ApolloClient({
        dataIdFromObject,
        networkInterface,
        customResolvers: {
            Query: {
                associatedEvent: (_, { id }) => toIdValue(dataIdFromObject({ id })),
            },
        },
    })
}
