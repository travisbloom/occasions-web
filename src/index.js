import 'whatwg-fetch'
import 'babel-polyfill'

import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import { reducer as reduxFormReducer } from 'redux-form'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

import App from './pages/App/App'

const apolloClient = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: `${ENV.appServer}/graphql`,
        opts: {
            credentials: 'same-origin',
        },
    }),
})

const store = createStore(
  combineReducers({
      apollo: apolloClient.reducer(),
      form: reduxFormReducer,
  }),
  {},
  compose(
      applyMiddleware(apolloClient.middleware()),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
)

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <ApolloProvider client={apolloClient} store={store}>
                <Component />
            </ApolloProvider>
        </AppContainer>,
    document.getElementById('root'),
  )
}

render(App)

/* eslint-disable global-require */
if (module.hot) {
    module.hot.accept('./pages/App/App', () => {
        const NewApp = require('./pages/App/App').default
        render(NewApp)
    })
}
/* eslint-enable global-require */
