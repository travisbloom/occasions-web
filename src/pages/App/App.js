// @flow
import React from 'react'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'

import { View, Alert, Grid, AnimatedRouter } from '../../components'
import { closeError } from '../../actions/alerts'
import type { AppQuery } from '../../types/schema'

import AssociatedEventsList from '../AssociatedEventsList/AssociatedEventsList'
import AssociatedEventDetails from '../AssociatedEventDetails/AssociatedEventDetails'
import PurchaseProduct from '../PurchaseProduct/PurchaseProduct'
import TransactionDetails from '../TransactionDetails/TransactionDetails'
import CreateAssociatedEvent from '../CreateAssociatedEvent/CreateAssociatedEvent'
import CreatePerson from '../CreatePerson/CreatePerson'

import Navbar from './Navbar'
import Tabs from './Tabs'
import graphqlQuery from './AppQuery.graphql'

const PAGE_STYLES = { marginBottom: `${Tabs.height}px` }

class App extends React.Component {
    props: {
        data: AppQuery,
        errors: Array<string>,
        closeError: number => void,
    }
    state = {
        hasBackButton: false,
    }

    mapStyles = styles => ({
        ...styles,
        position: 'absolute',
        height: '100%',
        width: '100%',
    })

    render() {
        const { data: { currentUser }, errors } = this.props
        const routeProps = { currentUser, style: PAGE_STYLES }
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
                <Grid>
                    <AnimatedRouter.Switch style={{ position: 'relative', width: '100%' }}>
                        <AnimatedRouter.Route
                            exact
                            {...routeProps}
                            path="/a/yourEvents"
                            component={AssociatedEventsList}
                        />
                        <AnimatedRouter.Route
                            exact
                            {...routeProps}
                            path="/a/yourEvents/new"
                            component={CreateAssociatedEvent}
                        />
                        <AnimatedRouter.Route
                            exact
                            {...routeProps}
                            path="/a/yourEvents/:associatedEventId"
                            component={AssociatedEventDetails}
                        />
                        <AnimatedRouter.Route
                            exact
                            {...routeProps}
                            path="/a/yourEvents/:associatedEventId/:productId"
                            component={PurchaseProduct}
                        />
                        <AnimatedRouter.Route
                            {...routeProps}
                            path="/a/yourGifts/:transactionId"
                            component={TransactionDetails}
                        />
                        <AnimatedRouter.Route
                            {...routeProps}
                            path="/a/yourContacts/new"
                            component={CreatePerson}
                        />
                    </AnimatedRouter.Switch>
                </Grid>
                <Tabs />
            </View>
        )
    }
}

export default compose(
    graphql(graphqlQuery),
    connect(({ alerts: { errors } }) => ({ errors }), { closeError }),
)(App)
