// @flow

import React from 'react'
import { reduxForm, Form, getFormValues } from 'redux-form'
import { connect } from 'react-redux'
import { graphql, compose, withApollo } from 'react-apollo'
import { withRouter } from 'react-router'
import gql from 'graphql-tag'

import { Alert, View, Panel, Button } from '../../components'
import { EventDate } from '../../fragmentComponents'
import { formatGeneralReduxFormErrors } from '../../utilities/errors'
import urls from '../../urls'

class ConfirmationPage extends React.Component {
    handleSubmit = ({ eventId, event, receivingPersonId }) => {
        const { createAssociatedEvent, router } = this.props
        const input = {
            eventId,
            event: eventId ? null : event,
            receivingPersonId: receivingPersonId ? receivingPersonId.value : null,
        }
        return createAssociatedEvent(input)
            .then(({ data: { createAssociatedEvent: { associatedEvent } } }) =>
                router.push(urls.associatedEventDetails(associatedEvent.id)))
            .catch(formatGeneralReduxFormErrors)
    };

    handleSelectEvent = event => this.props.change('eventId', event.pk);

    render() {
        const { handleSubmit, error, formValues } = this.props

        return (
            <Form onSubmit={handleSubmit(this.handleSubmit)}>
                <View marginChildren>
                    <Panel header={`${formValues.receivingPersonId.label}'s Event`}>
                        <View>{formValues.event.name}</View>
                        <View><EventDate event={formValues.event} /></View>
                    </Panel>
                    <Button type="submit" block>Create Event</Button>
                    <Alert dismissable unHideWithChildren stackChildren bsStyle="danger">
                        {error}
                    </Alert>
                </View>
            </Form>
        )
    }
}

const createTransactionQuery = gql`
mutation CreateAssociatedEvent($input: CreateAssociatedEventInput!) {
  createAssociatedEvent(input: $input) {
    associatedEvent {
      id
      creatingPerson {
        fullName
      }
      receivingPerson {
        fullName
      }
      event {
        name

      }
    }
  }
}
`
const formValuesSelector = getFormValues('CreateAssociatedEventForm')
export default compose(
    connect(state => ({
        formValues: formValuesSelector(state),
    })),
    graphql(createTransactionQuery, {
        props: ({ mutate }) => ({
            createAssociatedEvent: values => mutate({ variables: { input: values } }),
        }),
    }),
    reduxForm({
        form: 'CreateAssociatedEventForm',
        destroyOnUnmount: false,
    }),
    withRouter,
    withApollo,
)(ConfirmationPage)
