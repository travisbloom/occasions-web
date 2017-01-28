import 'whatwg-fetch'
import 'babel-polyfill'

import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import routes from './routes'
import { getAccessToken } from './requests/auth'
import debug from './utilities/debug'
import createStore from './createStore'

const networkInterface = createNetworkInterface({
    uri: `${GLOBAL_ENV.appServer}/graphql`,
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
            req.options.headers.authorization = accessToken
            next()
        })
        .catch(() => {
            debug('Failed to fetch tokens')
        })
    },
}])
/* eslint-enable no-param-reassign */


const apolloClient = new ApolloClient({
    networkInterface,
})

const store = createStore({ apolloClient, routerReducer })
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

const render = (passedRoutes) => {
    ReactDOM.render(
        <AppContainer>
            <ApolloProvider client={apolloClient} store={store}>
                <Router history={history} routes={passedRoutes} />
            </ApolloProvider>
        </AppContainer>,
    document.getElementById('root'),
  )
}

render(routes)

/* eslint-disable global-require */
if (module.hot) {
    module.hot.accept('./Routes', () => {
        const newRoutes = require('./routes').default
        render(newRoutes)
    })
}
/* eslint-enable global-require */
