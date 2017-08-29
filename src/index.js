import 'whatwg-fetch'
import 'babel-polyfill'

import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'

import Routes from './Routes'
import { hasAccessToken } from './utilities/auth'
import createStore from './createStore'
import buildApolloClient from './buildApolloClient'

import './styles/global.scss'

/* eslint-disable global-require */
if (process.env.NODE_ENV !== 'production') {
    window.moment = require('moment')
    window._ = require('lodash')
    window.mockExpireAccessToken = () => {
        const { accessToken, refreshToken } = JSON.parse(localStorage.getItem('tokens'))
        localStorage.setItem(
            'tokens',
            JSON.stringify({
                accessToken,
                refreshToken,
                expiresAt: window
                    .moment()
                    .subtract(1, 'hours')
                    .toISOString(),
            })
        )
    }
}
/* eslint-enable global-require */
const history = createHistory()
const apolloClient = buildApolloClient({ history })

const store = createStore({
    apolloClient,
    history,
    initialState: { user: { isLoggedIn: hasAccessToken() } },
})

const render = passedRoutes => {
    ReactDOM.render(
        <AppContainer>
            <ApolloProvider client={apolloClient} store={store}>
                <ConnectedRouter history={history}>{passedRoutes}</ConnectedRouter>
            </ApolloProvider>
        </AppContainer>,
        document.getElementById('root')
    )
}

render(<Routes />)

/* eslint-disable global-require */
if (module.hot) {
    module.hot.accept('./Routes', () => {
        const NewRoutes = require('./Routes').default
        render(<NewRoutes />)
    })
}
/* eslint-enable global-require */
