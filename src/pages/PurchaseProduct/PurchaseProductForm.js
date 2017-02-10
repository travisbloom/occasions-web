// @flow

import React from 'react'
import { reduxForm, Form } from 'redux-form'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router'
import gql from 'graphql-tag'
import StripeCheckout from 'react-stripe-checkout'

import { FormField, Input, Button, Row, Alert, View, Header, Select, Col } from '../../components'
import { formatReduxFormErrors } from '../../utilities/errors'
import urls from '../../urls'

import NewAddressForm from './NewAddressForm'

class PurchaseProductForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isAddingNewAddress: false,
        }
    }

    onAddNewAddress = ({ data }) => {
        const { refetch, change } = this.props
        const newAssociatedLocation = data.createAssociatedLocation.associatedLocation
        return (
            refetch()
                .then(() => change('locationId', {
                    label: newAssociatedLocation.location.displayName,
                    value: newAssociatedLocation.id,
                }))
                .then(this.onToggleNewAddressForm)
        )
    }

    onToggleNewAddressForm = () => this.setState(prevState => ({
        isAddingNewAddress: !prevState.isAddingNewAddress,
        intialAddressFormValues: !prevState.isAddingNewAddress ? {
            personId: this.props.associatedEvent.receivingPerson.pk,
            location: {
                streetAddressLine1: '',
                streetAddressLine2: '',
                city: '',
                state: '',
                postalCode: '',
            },
        } : null,
    }))

    onToken = (values) => {
        const { createStripeUser, submit } = this.props
        createStripeUser(values).then(submit)
    }

    getLocationOptions = () => {
        const locations = this.props.associatedEvent.receivingPerson.associatedLocations.edges
        return locations.map(({
            node: { location, pk },
        }) => ({
            label: location.displayName,
            value: pk,
        }))
    }

    purchaseProduct = (values) => {
        const { purchaseProduct, router } = this.props
        const variables = {
            ...values,
            associatedLocationId: (
                values.associatedLocationId ? values.associatedLocationId.value : null
            ),
        }
        return (
            purchaseProduct(variables)
                .then(({ data: { createTransaction: { transaction } } }) =>
                    router.push(urls.transactionDetails(transaction.id)),
                )
                .catch(formatReduxFormErrors)
        )
    }

    handleSubmit = (values) => {
        const { currentUser } = this.props
        if (currentUser.hasStripeUser) {
            return this.purchaseProduct(values)
        }
        return Promise.resolve()
    }

    renderCheckoutButton = () => {
        const { submitting, pristine, product, currentUser } = this.props
        const button = (
            <Button
                disabled={submitting || pristine}
                bsStyle="info"
                type="submit"
            >
                Purchase Card
            </Button>
        )
        if (currentUser.hasStripeUser) {
            return button
        }
        return (
            <StripeCheckout
                token={this.onToken}
                currency="USD"
                product={product.costUsd}
                name={product.name}
                description={product.description}
                email={currentUser.email}
                zipCode
                allowRememberMe
                stripeKey={'pk_test_VQtPlmj5VhEm9xOlrRJIDxWG'}
            >
                {button}
            </StripeCheckout>
        )
    }

    render() {
        const { isAddingNewAddress, intialAddressFormValues } = this.state
        const { handleSubmit, error, associatedEvent } = this.props

        return (
            <View>
                <NewAddressForm
                    initialValues={intialAddressFormValues}
                    show={isAddingNewAddress}
                    onHide={this.onToggleNewAddressForm}
                    onComplete={this.onAddNewAddress}
                    person={associatedEvent.receivingPerson}
                />
                <Header>Where Should We Send This Card?</Header>
                <Form onSubmit={handleSubmit(this.handleSubmit)}>
                    <Row>
                        <Col xs={8}>
                            <FormField
                                name="associatedLocationId"
                                component={Select}
                                options={this.getLocationOptions()}
                            />
                        </Col>
                        <Col xs={4}>
                            <Button onClick={this.onToggleNewAddressForm}>
                                Add New Location
                            </Button>
                        </Col>
                    </Row>
                    <FormField
                        name="productNotes"
                        component={Input}
                        textarea
                    />
                    {this.renderCheckoutButton()}
                    <Alert
                        dismissable
                        unHideWithChildren
                        stackChildren
                        bsStyle="danger"
                    >
                        {error}
                    </Alert>
                </Form>
            </View>
        )
    }
}

const createStripeUserQuery = gql`
  mutation createStripeUser($input: CreateStripeUserInput!) {
    createStripeUser(input: $input) {
        user {
            username,
            accessTokens {
              edges {
                node {
                  id
                }
              }
          }
        }
    }
  }
`

const createTransactionQuery = gql`
mutation createTransactionQuery($input: CreateTransactionInput!) {
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
    graphql(createStripeUserQuery, {
        props: ({ mutate }) => ({
            createStripeUser: values => mutate({ variables: { input: values } }),
        }),
    }),
    graphql(createTransactionQuery, {
        props: ({ mutate }) => ({
            purchaseProduct: values => mutate({ variables: { input: values } }),
        }),
    }),
    reduxForm({
        form: 'PurchaseProductForm',
    }),
    withRouter,
)(PurchaseProductForm)
