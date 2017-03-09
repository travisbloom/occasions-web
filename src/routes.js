import React from 'react'
import { Route, IndexRoute } from 'react-router'

import AssociatedEventsList from './pages/AssociatedEventsList/AssociatedEventsList'
import App from './pages/App/App'
import SignIn from './pages/SignIn/SignIn'
import MarketingHome from './pages/MarketingHome/MarketingHome'
import AssociatedEventDetails from './pages/AssociatedEventDetails/AssociatedEventDetails'
import PurchaseProduct from './pages/PurchaseProduct/PurchaseProduct'
import TransactionDetails from './pages/TransactionDetails/TransactionDetails'
import CreateAssociatedEvent from './pages/CreateAssociatedEvent/CreateAssociatedEvent'
import CreatePerson from './pages/CreatePerson/CreatePerson'

import { hasAccessToken } from './utilities/auth'
import debug from './utilities/debug'
import urls from './urls'

const redirectUserBasedOnAuth = (nextState, replace) => {
    if (hasAccessToken()) {
        debug('redirecting logged in user to home')
        replace(urls.associatedEventsList())
    } else {
        debug('redirecting logged out user to marketing home')
        replace(urls.marketingHome())
    }
}

export default (
    <Route path="/">
        <Route path="signIn" component={SignIn} />
        <Route path="welcome" component={MarketingHome} />
        <Route path="a" component={App}>
            <Route path="yourEvents">
                <IndexRoute component={AssociatedEventsList} />
                <Route path="new" component={CreateAssociatedEvent} />
                <Route path=":associatedEventId">
                    <IndexRoute component={AssociatedEventDetails} />
                    <Route path=":productSlug" component={PurchaseProduct} />
                </Route>
            </Route>
            <Route path="yourGifts">
                <Route path=":transactionId" component={TransactionDetails} />
            </Route>
            <Route path="yourContacts">
                <Route path="new" component={CreatePerson} />
            </Route>
        </Route>
        <IndexRoute onEnter={redirectUserBasedOnAuth} />
        {process.env.NODE_ENV === 'production' &&
            <Route path="*" onEnter={redirectUserBasedOnAuth} />}
    </Route>
)
