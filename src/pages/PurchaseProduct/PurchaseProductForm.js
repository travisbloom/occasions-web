// @flow

import React from 'react'
import { reduxForm } from 'redux-form'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router'
import gql from 'graphql-tag'

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


    onSuccess = () => this.props.router.push(urls.home())

    getLocationOptions = () => {
        const locations = this.props.associatedEvent.receivingPerson.associatedLocations.edges
        return locations.map(({
            node: { location, id },
        }) => ({
            label: location.displayName,
            value: id,
        }))
    }

    purchaseProduct = (values) => {
        const { purchaseProduct } = this.props
        return (
            purchaseProduct(values)
                .then(this.onSuccess)
                .catch(formatReduxFormErrors)
        )
    }

    render() {
        const { isAddingNewAddress, intialAddressFormValues } = this.state
        const { handleSubmit, submitting, pristine, error, associatedEvent } = this.props

        return (
            <View>
                <NewAddressForm
                    initialValues={intialAddressFormValues}
                    show={isAddingNewAddress}
                    onHide={this.onToggleNewAddressForm}
                    onComplete={this.onAddNewAddress}
                    person={associatedEvent.receivingPerson}
                />
                <form onSubmit={handleSubmit(this.purchaseProduct)}>
                    <Header>Where Should We Send This Card?</Header>
                    <Row>
                        <Col xs={8}>
                            <FormField
                                name="locationId"
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
                    <Alert
                        dismissable
                        unHideWithChildren
                        stackChildren
                        bsStyle="danger"
                    >
                        {error}
                    </Alert>
                    <Row center="xs">
                        <Button
                            disabled={submitting || pristine}
                            type="submit"
                        >
                            Purchase Card
                        </Button>
                    </Row>
                </form>
            </View>
        )
    }
}

const query = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
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

export default compose(
    graphql(query, {
        props: ({ mutate }) => ({
            purchaseProduct: values => mutate({ variables: { input: values } }),
        }),
    }),
    reduxForm({
        form: 'PurchaseProductForm',
    }),
    withRouter,
)(PurchaseProductForm)
