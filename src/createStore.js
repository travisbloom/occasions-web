import { reducer as reduxFormReducer } from 'redux-form'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'


export default ({ apolloClient, routerReducer }) => {
    const store = createStore(
      combineReducers({
          apollo: apolloClient.reducer(),
          routing: routerReducer,
          form: reduxFormReducer,
      }),
      {},
      compose(
          applyMiddleware(apolloClient.middleware()),
          window.devToolsExtension ? window.devToolsExtension() : f => f,
      ),
    )
    return store
}
