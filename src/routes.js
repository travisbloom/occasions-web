import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import App from './pages/App/App'
import SignIn from './pages/SignIn/SignIn'
import MarketingHome from './pages/MarketingHome/MarketingHome'

import { hasAccessToken } from './utilities/auth'
import debug from './utilities/debug'
import urls from './urls'

const RedirectBasedOffLoggedin = () => {
    if (hasAccessToken()) {
        debug('redirecting logged in user to home')
        return <Redirect to={urls.associatedEventsList()} />
    }
    debug('redirecting logged out user to marketing home')
    return <Redirect to={urls.marketingHome()} />
}

export default () => (
    <Switch>
        <Route path="/signIn" component={SignIn} />
        <Route path="/welcome" component={MarketingHome} />
        <Route path="/a" component={App} />
        <Route path="/" exact render={RedirectBasedOffLoggedin} />
    </Switch>
)
