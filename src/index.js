import 'whatwg-fetch'
import 'babel-polyfill'

import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import routes from './routes'
import { hasAccessToken } from './utilities/auth'
import createStore from './createStore'
import buildApolloClient from './buildApolloClient'

/* eslint-disable global-require */
if (process.env.NODE_ENV !== 'production') {
    const moment = require('moment').default
    const _ = require('lodash').default
    window.moment = moment
    window._ = _
}
/* eslint-enable global-require */

const apolloClient = buildApolloClient({ history: browserHistory })

const store = createStore({
    apolloClient,
    initialState: { user: { isLoggedIn: hasAccessToken() } },
})

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
    module.hot.accept('./routes', () => {
        const newRoutes = require('./routes').default
        render(newRoutes)
    })
}
/* eslint-enable global-require */
