// @flow
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { flatMapDeep } from 'lodash'

import { View, Alert, Grid, AnimatedRouter, FourOhFour } from '../../components'
import { closeError } from '../../actions/alerts'
import type { AppQuery } from '../../types/schema'

import AppNav from './Navbar'
import Tabs from './Tabs'
import graphqlQuery from './AppQuery.graphql'
import routes from './routes'
import Breadcrumbs from './Breadcrumbs'

const flattenRoutes = topRoutes =>
    flatMapDeep(topRoutes, ({ routes: nestedRoutes, ...other }) => [
        other,
        ...flattenRoutes(nestedRoutes),
    ])

type Props = {
    data: AppQuery,
    location: Location,
    errors: Array<string>,
    closeError: number => void,
}

class App extends React.Component<Props, { hasBackButton: boolean }> {
    flattenedRoutes: Array<{
        path: string,
        component: React.Component<*>,
        exact: boolean,
    }>
    state = {
        hasBackButton: false,
    }

    constructor(props: Props) {
        super(props)
        this.flattenedRoutes = flattenRoutes(routes)
    }

    render() {
        const { data: { currentUser }, errors, location } = this.props
        const routeProps = { currentUser }
        return (
            <View>
                <AppNav currentUser={currentUser} />
                <View
                    style={{
                        position: 'fixed',
                        bottom: '40px',
                        width: '100%',
                        zIndex: '2',
                    }}
                    padding
                >
                    {errors.map((err, index) => (
                        <Alert
                            style={{ marginBottom: '10px' }}
                            onDismiss={() => this.props.closeError(index)}
                            bsStyle="danger"
                            key={index}
                        >
                            {err}
                        </Alert>
                    ))}
                </View>
                <Grid>
                    <Breadcrumbs location={location} />
                    <AnimatedRouter.Switch>
                        <Redirect path="/a" exact to="/a/yourEvents" />
                        {this.flattenedRoutes.map(props => (
                            <AnimatedRouter.Route key={props.path} {...props} />
                        ))}
                        <AnimatedRouter.Route {...routeProps} path="/a/" component={FourOhFour} />
                    </AnimatedRouter.Switch>
                </Grid>
                <Tabs />
            </View>
        )
    }
}

export default compose(
    graphql(graphqlQuery),
    connect(({ alerts: { errors } }) => ({ errors }), { closeError })
)(App)
