import React from 'react'
// import { RouteTransition } from 'react-router-transition'
import presets from 'react-router-transition/src/presets'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import gql from 'graphql-tag'

import { View, Alert, Grid } from '../../components'
import { closeError } from '../../actions/alerts'

import Navbar from './Navbar'
import Tabs from './Tabs'

class App extends React.Component {
    state = {
        hasBackButton: false,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname === this.props.location.pathname) {
            return
        }
        const routeDepthDiff = nextProps.routes.length - this.props.routes.length
        const shorterRouteStack = routeDepthDiff < 0 ? nextProps.routes : this.props.routes
        const longerRouteStack = routeDepthDiff > 0 ? nextProps.routes : this.props.routes
        const sameRoutePaths = shorterRouteStack.every(
            ({ path }, index) =>
                index < shorterRouteStack.lengt - 1 ? path === longerRouteStack[index].path : true,
        )
        if (!sameRoutePaths) {
            if (this.state.hasBackButton) {
                this.setState({ hasBackButton: false })
            }
        } else {
            const secondToLastRoute = nextProps.routes[nextProps.routes.length - 3]
            const isNestedRoute = secondToLastRoute.path !== 'a'
            if (isNestedRoute && !this.state.hasBackButton) {
                this.setState({ hasBackButton: true })
            } else if (!isNestedRoute && this.state.hasBackButton) {
                this.setState({ hasBackButton: false })
            }
        }
    }

    mapStyles = styles => ({
        ...styles,
        position: 'absolute',
        height: '100%',
        width: '100%',
    });

    slideRight = styles => this.mapStyles(presets.slideRight.mapStyles(styles));

    slideLeft = styles => this.mapStyles(presets.slideLeft.mapStyles(styles));

    render() {
        const { children, data: { currentUser }, errors } = this.props

        return (
            <View>
                <Navbar hasBackButton={this.state.hasBackButton} currentUser={currentUser} />
                <View
                    style={{
                        position: 'fixed',
                        bottom: `${Tabs.height}px`,
                        width: '100%',
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
                <Grid
                    style={{
                        marginTop: `${Navbar.height}px`,
                        marginBottom: `${Tabs.height}px`,
                    }}
                >
                    {children}
                </Grid>
                <Tabs />
            </View>
        )
    }
}

const query = gql`
query App {
currentUser {
    person {
      fullName
    }
  }
}
`

export default compose(
    graphql(query),
    connect(({ alerts: { errors } }) => ({ errors }), { closeError }),
)(App)
