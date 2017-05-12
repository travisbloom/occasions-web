// @flow

import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import DocumentTitle from 'react-document-title'

import { View, AnimatedRouter } from '../../components'
import urls from '../../urls'

import PersonInfoPage from './PersonInfoPage'
import AddAddressPage from './AddAddressPage'
import ConfirmationPage from './ConfirmationPage'

import graphqlQuery from './CreatePersonQuery.graphql'

class CreatePerson extends React.Component {
    render() {
        return (
            <DocumentTitle title="Occasions | Add Contact">
                <View padding>
                    <AnimatedRouter.Switch>
                        <AnimatedRouter.Route
                            exact
                            path={urls.createPerson()}
                            component={PersonInfoPage}
                        />
                        <AnimatedRouter.Route
                            exact
                            path={`${urls.createPerson()}/address/:addressIndex`}
                            component={AddAddressPage}
                        />
                        <AnimatedRouter.Route
                            exact
                            path={`${urls.createPerson()}/confirmation`}
                            component={ConfirmationPage}
                        />
                    </AnimatedRouter.Switch>
                </View>
            </DocumentTitle>
        )
    }
}

export default compose(withRouter, graphql(graphqlQuery))(CreatePerson)
