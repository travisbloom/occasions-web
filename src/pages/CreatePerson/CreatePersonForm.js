// @flow

import React from 'react'
import { reduxForm, Form } from 'redux-form'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router'
import gql from 'graphql-tag'
import StripeCheckout from 'react-stripe-checkout'

import { View, Link } from '../../components'
import { formatReduxFormErrors } from '../../utilities/errors'
import urls from '../../urls'

import { NewAddressForm } from '../../containers'
import PersonInfoPage from './PersonInfoPage'
import AddAddressPage from './AddAddressPage'
import ConfirmationPage from './ConfirmationPage'

class CreatePersonForm extends React.Component {
    state = {
        page: 1,
        addressIndex: 0,
    };

    nextPage = () => this.setState({ page: this.state.page + 1 });

    previousPage = () => this.setState({ page: this.state.page - 1 });

    handleSubmit = (values) => {
        const { createPerson, onSuccess } = this.props
        createPerson(values).then(onSuccess).catch(formatReduxFormErrors)
    };

    onAddAddress = () => this.setState(state => ({
        page: 2,
        addressIndex: state.addressIndex + 1,
    }));

    renderPage = () => {
        const { page, addressIndex } = this.state
        switch (page) {
        case 2:
            return <PersonInfoPage onSubmit={this.nextPage} />
        case 1:
            return <AddAddressPage addressIndex={addressIndex} onSubmit={this.nextPage} />
        }
        return <ConfirmationPage onAddAddress={this.onAddAddress} />
    };

    renderBackLanguage = () => {
        const { page } = this.state
        switch (page) {
        case 1:
            return null
        case 2:
            return 'Select Receiving Person'
        }
        return 'Select Event'
    };

    render() {
        const {
            style,
        } = this.props

        return (
            <View style={style} padding>
                <View>
                    <Link onClick={this.previousPage}>{this.renderBackLanguage()}</Link>
                </View>
                {this.renderPage()}
            </View>
        )
    }
}

const createPersonQuery = gql`
mutation createPersonQuery($input: CreateTransactionInput!) {
    createTransaction(input: $input) {
      transaction {
        id
        costUsd
        product {
          id
          name
        }
        associatedLocation {
          id
          location {
            id
            displayName
          }
        }
        stripeTransactionId
        productNotes
      }
    }
}
`

export default compose(
    graphql(createPersonQuery, {
        props: ({ mutate }) => ({
            createPerson: values => mutate({ variables: { input: values } }),
        }),
    }),
    withRouter,
)(CreatePersonForm)
