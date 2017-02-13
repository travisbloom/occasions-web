// @flow

import React from 'react'
import { reduxForm, Form } from 'redux-form'
import { graphql, compose, withApollo } from 'react-apollo'
import { withRouter } from 'react-router'
import gql from 'graphql-tag'

import { ReduxFormField, Input, Button, Row, Alert, View, Header, Select, Col } from '../../components'
import { EventCatalog } from '../../containers'
import { formatReduxFormErrors } from '../../utilities/errors'
import urls from '../../urls'
import { searchPeople } from '../../utilities/search'

class CreateAssociatedEventForm extends React.Component {

    handleSubmit = (values) => {
        const { createAssociatedEvent, router } = this.props
        const variables = {
            ...values,
            associatedLocationId: (
                values.associatedLocationId ? values.associatedLocationId.value : null
            ),
        }
        return (
            createAssociatedEvent(variables)
                .then(({ data: { createTransaction: { transaction } } }) =>
                    router.push(urls.transactionDetails(transaction.id)),
                )
                .catch(formatReduxFormErrors)
        )
    }

    render() {
        const { handleSubmit, error, products, client } = this.props

        return (
            <View>
                <Form onSubmit={handleSubmit(this.handleSubmit)}>
                    <Header>Who Is This Event For?</Header>
                    <ReduxFormField
                        remote
                        loadOptions={searchPeople(client)}
                        name="receivingPersonId"
                        component={Select}
                    />
                    <EventCatalog />
                    <Button type="submit">Create Event</Button>
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
    graphql(createTransactionQuery, {
        props: ({ mutate }) => ({
            createAssociatedEvent: values => mutate({ variables: { input: values } }),
        }),
    }),
    reduxForm({
        form: 'CreateAssociatedEventForm',
    }),
    withRouter,
    withApollo,
)(CreateAssociatedEventForm)
