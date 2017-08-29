// @flow

import React from 'react'
import { reduxForm, Form } from 'redux-form'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'

import {
    ReduxFormField,
    TextInput,
    Button,
    Row,
    Alert,
    View,
    Header,
    Select,
    Col,
    Placeholder,
} from '../../components'
import { formatReduxFormErrors } from '../../utilities/errors'
import urls from '../../urls'

import { NewAddressForm } from '../../containers'

import createStripeUserGraphqlQuery from './CreateStripeUserMutation.graphql'
import createTransactionGraphqlQuery from './CreateTransactionMutation.graphql'

class PurchaseProductForm extends React.Component {
    state: {
        isAddingNewAddress: boolean,
        intialAddressFormValues: ?{
            personId: number,
            location: {
                streetAddressLine1: string,
                streetAddressLine2: string,
                city: string,
                state: string,
                postalCode: string,
            },
        },
    }

    constructor(props) {
        super(props)
        this.state = {
            isAddingNewAddress: false,
            intialAddressFormValues: null,
        }
    }

    onAddNewAddress = ({ data }) => {
        const { refetch, change } = this.props
        const newAssociatedLocation = data.createAssociatedLocation.associatedLocation
        return refetch()
            .then(() =>
                change('locationId', {
                    label: newAssociatedLocation.location.displayName,
                    value: newAssociatedLocation.id,
                })
            )
            .then(this.onToggleNewAddressForm)
    }

    onToggleNewAddressForm = () =>
        this.setState(prevState => ({
            isAddingNewAddress: !prevState.isAddingNewAddress,
            intialAddressFormValues: !prevState.isAddingNewAddress
                ? {
                      personId: this.props.associatedEvent.receivingPerson.id,
                      location: {
                          streetAddressLine1: '',
                          streetAddressLine2: '',
                          city: '',
                          state: '',
                          postalCode: '',
                      },
                  }
                : null,
        }))

    onToken = values => {
        const { createStripeUser, submit } = this.props
        createStripeUser(values).then(submit)
    }

    getLocationOptions = () => {
        const locations = this.props.associatedEvent.receivingPerson.associatedLocations.edges
        return locations.map(({ node: { location, id } }) => ({
            label: location.displayName,
            value: id,
        }))
    }

    purchaseProduct = values => {
        const { purchaseProduct, history } = this.props
        const variables = {
            ...values,
            associatedLocationId: values.associatedLocationId
                ? values.associatedLocationId.value
                : null,
        }
        return purchaseProduct(variables)
            .then(({ data: { createTransaction: { transaction } } }) =>
                history.push(urls.transactionDetails(transaction.id))
            )
            .catch(formatReduxFormErrors)
    }

    handleSubmit = values => {
        const { currentUser } = this.props
        if (currentUser.hasStripeUser) {
            return this.purchaseProduct(values)
        }
        return Promise.resolve()
    }

    renderCheckoutButton = () => {
        const { submitting, pristine, product, currentUser } = this.props
        const button = (
            <Button disabled={submitting || pristine} type="submit" responsive data-e2e="submit">
                Purchase Card
            </Button>
        )
        if (currentUser.hasStripeUser || (window.navigator && !window.navigator.onLine)) {
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
                stripeKey={APP_ENV.stripeClientId}
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
                    <View>
                        <Row>
                            <Col xs={12} sm={7} md={8}>
                                <ReduxFormField
                                    data-e2e="input-associated-location-id"
                                    name="associatedLocationId"
                                    component={Select}
                                    options={this.getLocationOptions()}
                                />
                            </Col>
                            <Col xs={12} sm={5} md={4}>
                                <Button block onClick={this.onToggleNewAddressForm}>
                                    Add New Location
                                </Button>
                            </Col>
                        </Row>
                        <ReduxFormField
                            data-e2e="input-product-notes"
                            name="productNotes"
                            component={TextInput}
                            textarea
                        />
                        <View marginTop>{this.renderCheckoutButton()}</View>
                        <Alert dismissable unHideWithChildren stackChildren bsStyle="danger">
                            {error}
                        </Alert>
                    </View>
                </Form>
            </View>
        )
    }
}

const wrappedComponent = compose(
    graphql(createStripeUserGraphqlQuery, {
        props: ({ mutate }) => ({
            createStripeUser: values => mutate({ variables: { input: values } }),
        }),
    }),
    graphql(createTransactionGraphqlQuery, {
        props: ({ mutate }) => ({
            purchaseProduct: values => mutate({ variables: { input: values } }),
        }),
    }),
    reduxForm({
        form: 'PurchaseProductForm',
    }),
    withRouter
)(PurchaseProductForm)

wrappedComponent.Shell = () => (
    <View>
        <Header>
            <Placeholder>Where Should We Send This Card?</Placeholder>
        </Header>
        <View>
            <Row>
                <Col xs={12} sm={7} md={8}>
                    <Select />
                </Col>
                <Col xs={12} sm={5} md={4}>
                    <Button block>
                        <Placeholder light>Add New Location</Placeholder>
                    </Button>
                </Col>
            </Row>
            <TextInput textarea />
            <View marginTop>
                <Button responsive type="submit">
                    <Placeholder light>Purchase Card</Placeholder>
                </Button>
            </View>
        </View>
    </View>
)

export default wrappedComponent
