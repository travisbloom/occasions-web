import ApolloClient, { HTTPFetchNetworkInterface, toIdValue } from 'apollo-client'

import urls from './urls'
import { getAccessToken, hasAccessToken } from './utilities/auth'
import debug from './utilities/debug'

class NetworkInterface extends HTTPFetchNetworkInterface {
    setUri(uri) {
        this._uri = uri
    }
}

export default ({ history }) => {
    const networkInterface = new NetworkInterface(
        hasAccessToken() ? `${APP_ENV.appServer}/graphql` : `${APP_ENV.appServer}/graphql_public`,
        {
            credentials: 'same-origin',
        },
    )

    /* eslint-disable no-param-reassign */
    networkInterface.use([{
        applyMiddleware(req, next) {
            getAccessToken().then((accessToken) => {
                if (!req.options.headers) {
                    req.options.headers = {}
                }
                req.options.headers.Authorization = `Bearer ${accessToken}`
                next()
            })
            .catch(() => {
                debug('Failed to fetch tokens')
                if (window.location.pathname === urls.signIn()) {
                    next()
                } else {
                    history.push(urls.signIn())
                }
            })
        },
    }])
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
