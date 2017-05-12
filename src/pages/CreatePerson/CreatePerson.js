// @flow

import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { View, AnimatedRouter } from '../../components'
import urls from '../../urls'

import PersonInfoPage from './PersonInfoPage'
import AddAddressPage from './AddAddressPage'
import ConfirmationPage from './ConfirmationPage'

import graphqlQuery from './CreatePersonQuery.graphql'

class CreatePerson extends React.Component {
    render() {
        const { firstNameValue, location } = this.props
        return (
            <DocumentTitle title="Occasions | Add Contact">
                <View padding>
                    {!firstNameValue &&
                        location.pathname !== urls.createPerson() &&
                        <Redirect path={urls.createPerson()} to={urls.createPerson()} />}
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

const selector = formValueSelector('CreatePersonForm')
export default compose(
    withRouter,
    graphql(graphqlQuery),
    reduxForm({
        initialValues: {
            locations: [{}],
        },
        destroyOnUnmount: true,
        form: 'CreatePersonForm',
    }),
    connect(state => ({
        firstNameValue: selector(state, 'firstName'),
    })),
)(CreatePerson)
