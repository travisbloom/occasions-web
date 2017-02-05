import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Home from './pages/Home/Home'
import App from './pages/App/App'
import SignIn from './pages/SignIn/SignIn'
import MarketingHome from './pages/MarketingHome/MarketingHome'
import AssociatedEventDetails from './pages/AssociatedEventDetails/AssociatedEventDetails'
import PurchaseProduct from './pages/PurchaseProduct/PurchaseProduct'

import { hasAccessToken } from './utilities/auth'
import debug from './utilities/debug'
import urls from './urls'

const redirectUserBasedOnAuth = (nextState, replace) => {
    if (hasAccessToken()) {
        debug('redirecting logged in user to home')
        replace(urls.home())
    } else {
        debug('redirecting logged out user to marketing home')
        replace(urls.marketingHome())
    }
}

const rerouteBasedOffLoggedInStatus = (nextState, replace) => {
    const isRootRequest = nextState.routes.length === 1
    if (isRootRequest) {
        redirectUserBasedOnAuth(nextState, replace)
    }
}

export default (
    <Route path="/" onEnter={rerouteBasedOffLoggedInStatus}>
        <Route path="signIn" component={SignIn} />
        <Route path="welcome" component={MarketingHome} />
        <Route path="a" component={App}>
            <Route path="home" component={Home} />
            <Route path="yourEvents/:associatedEventId">
                <IndexRoute component={AssociatedEventDetails} />
                <Route path=":productSlug" component={PurchaseProduct} />
            </Route>
        </Route>
        <IndexRoute onEnter={redirectUserBasedOnAuth} />
        {process.env.NODE_ENV === 'production' &&
            <Route path="*" onEnter={redirectUserBasedOnAuth} />
        }
    </Route>
)
