import { reducer as reduxFormReducer } from 'redux-form'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'

import user from './reducers/user'

export default ({ apolloClient, initialState = {} }) => {
    const store = createStore(
      combineReducers({
          apollo: apolloClient.reducer(),
          routing: routerReducer,
          form: reduxFormReducer,
          user,
      }),
      initialState,
      compose(
          applyMiddleware(apolloClient.middleware(), thunk),
          window.devToolsExtension ? window.devToolsExtension() : f => f,
      ),
    )
    return store
}
