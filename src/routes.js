import React from 'react'
import { Route } from 'react-router'

import Home from './pages/Home/Home'
import App from './pages/App/App'
import SignIn from './pages/SignIn/SignIn'


export default (
    <Route path="/" component={App}>
        <Route path="sign_in" component={SignIn} />
        <Route path="a">
            <Route path="home" component={Home} />
        </Route>
    </Route>
)
