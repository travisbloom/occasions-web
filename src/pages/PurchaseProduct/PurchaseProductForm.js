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

        const locations = props.associatedEvent.receivingPerson.associatedLocations.edges

        this.locationOptions = locations.map(({
            node: { location },
        }) => ({
            label: location.displayName,
            value: location.id,
        }))

        this.state = {
            isAddingNewAddress: false,
        }
    }

    onToggleNewAddressForm = () => this.setState(prevState => ({
        isAddingNewAddress: !prevState.isAddingNewAddress,
    }))

    onSuccess = () => this.props.router.push(urls.home())

    purchaseProduct = (values) => {
        const { purchaseProduct } = this.props
        return (
            purchaseProduct(values)
                .then(this.onSuccess)
                .catch(formatReduxFormErrors)
        )
    }

    render() {
        const { isAddingNewAddress } = this.state
        const { handleSubmit, submitting, pristine, error, associatedEvent } = this.props

        return (
            <View>
                <NewAddressForm
                    show={isAddingNewAddress}
                    onHide={this.onToggleNewAddressForm}
                    onComplete={this.onToggleNewAddressForm}
                    person={associatedEvent.receivingPerson}
                />
                <form onSubmit={handleSubmit(this.purchaseProduct)}>
                    <Header>Where Should We Send This Card?</Header>
                    <Row>
                        <Col xs={8}>
                            <FormField
                                name="locationId"
                                component={Select}
                                options={this.locationOptions}
                            />
                        </Col>
                        <Col xs={4}>
                            <Button onClick={this.onToggleNewAddressForm}>
                                Add New Location
                            </Button>
                        </Col>
                    </Row>
                    <FormField
                        label="Password"
                        type="password"
                        name="password"
                        component={Input}
                    />
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
