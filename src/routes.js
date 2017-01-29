import React from 'react'
import { Route } from 'react-router'

import Home from './pages/Home/Home'
import App from './pages/App/App'
import SignIn from './pages/SignIn/SignIn'
import MarketingHome from './pages/MarketingHome/MarketingHome'

import { hasAccessToken } from './utilities/auth'
import urls from './urls'

const rerouteBasedOffLoggedInStatus = (nextState, replace) => {
    const isRootRequest = nextState.routes.length === 1
    if (isRootRequest) {
        if (hasAccessToken()) {
            replace(urls.home())
        } else {
            replace(urls.marketingHome())
        }
    }
}

export default (
    <Route path="/" component={App} onEnter={rerouteBasedOffLoggedInStatus}>
        <Route path="signIn" component={SignIn} />
        <Route path="welcome" component={MarketingHome} />
        <Route path="a">
            <Route path="home" component={Home} />
        </Route>
    </Route>
)
