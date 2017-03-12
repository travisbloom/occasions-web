import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import gql from 'graphql-tag'

import { View, Alert, Grid } from '../../components'
import { closeError } from '../../actions/alerts'

import AssociatedEventsList from '../AssociatedEventsList/AssociatedEventsList'
import AssociatedEventDetails from '../AssociatedEventDetails/AssociatedEventDetails'
import PurchaseProduct from '../PurchaseProduct/PurchaseProduct'
import TransactionDetails from '../TransactionDetails/TransactionDetails'
import CreateAssociatedEvent from '../CreateAssociatedEvent/CreateAssociatedEvent'
import CreatePerson from '../CreatePerson/CreatePerson'

import Navbar from './Navbar'
import Tabs from './Tabs'

class App extends React.Component {
    state = {
        hasBackButton: false,
    };

    // componentWillReceiveProps(nextProps) {
    //     console.log(this.props)
    //     if (nextProps.location.pathname === this.props.location.pathname) {
    //         return
    //     }
    //     const routeDepthDiff = nextProps.routes.length - this.props.routes.length
    //     const shorterRouteStack = routeDepthDiff < 0 ? nextProps.routes : this.props.routes
    //     const longerRouteStack = routeDepthDiff > 0 ? nextProps.routes : this.props.routes
    //     const sameRoutePaths = shorterRouteStack.every(
    //         ({ path }, index) =>
    //             index < shorterRouteStack.lengt - 1 ? path === longerRouteStack[index].path : true,
    //     )
    //     if (!sameRoutePaths) {
    //         if (this.state.hasBackButton) {
    //             this.setState({ hasBackButton: false })
    //         }
    //     } else {
    //         const secondToLastRoute = nextProps.routes[nextProps.routes.length - 3]
    //         const isNestedRoute = secondToLastRoute.path !== 'a'
    //         if (isNestedRoute && !this.state.hasBackButton) {
    //             this.setState({ hasBackButton: true })
    //         } else if (!isNestedRoute && this.state.hasBackButton) {
    //             this.setState({ hasBackButton: false })
    //         }
    //     }
    // }

    mapStyles = styles => ({
        ...styles,
        position: 'absolute',
        height: '100%',
        width: '100%',
    });

    render() {
        const { data: { currentUser }, errors } = this.props

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
                    <Switch>
                        <Route path="/a/yourEvents" exact component={AssociatedEventsList} />
                        <Route path="/a/yourEvents/new" exact component={CreateAssociatedEvent} />
                        <Route
                            exact
                            path="/a/yourEvents/:associatedEventId"
                            component={AssociatedEventDetails}
                        />
                        <Route
                            exact
                            path="/a/yourEvents/:associatedEventId/:productSlug"
                            component={PurchaseProduct}
                        />
                        <Route path="/a/yourGifts/:transactionId" component={TransactionDetails} />
                        <Route path="/a/yourContacts/new" component={CreatePerson} />
                    </Switch>
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
