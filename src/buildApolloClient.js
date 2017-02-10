import ApolloClient, { createNetworkInterface, toIdValue } from 'apollo-client'

import urls from './urls'
import { getAccessToken } from './utilities/auth'
import debug from './utilities/debug'

export default ({ history }) => {
    const networkInterface = createNetworkInterface({
        uri: `${APP_ENV.appServer}/graphql`,
        opts: {
            credentials: 'same-origin',
        },
    })

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
                history.push(urls.signIn())
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
