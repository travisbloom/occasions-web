import { reducer as reduxFormReducer } from 'redux-form'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

import user from './reducers/user'
import alerts from './reducers/alerts'

export default ({ apolloClient, history, initialState = {} }) => {
    const store = createStore(
        combineReducers({
            apollo: apolloClient.reducer(),
            routing: routerReducer,
            form: reduxFormReducer,
            user,
            alerts,
        }),
        initialState,
        compose(
            applyMiddleware(apolloClient.middleware(), thunk, routerMiddleware(history)),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    )
    return store
}
