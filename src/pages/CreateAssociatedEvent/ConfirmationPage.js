// @flow

import React from 'react'
import { reduxForm, Form, getFormValues } from 'redux-form'
import { connect } from 'react-redux'
import { graphql, compose, withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import { Alert, View, Panel, Button } from '../../components'
import { EventDate } from '../../fragmentComponents'
import { formatGeneralReduxFormErrors } from '../../utilities/errors'
import urls from '../../urls'

import graphqlQuery from './CreateAssociatedEventMutation.graphql'

class ConfirmationPage extends React.Component {
    handleSubmit = ({ eventId, event, receivingPersonId }) => {
        const { createAssociatedEvent, history } = this.props
        const formattedEvent = event && {
            ...event,
            eventTypes: event.eventTypes.map(({ value }) => value),
        }
        const input = {
            eventId,
            event: eventId ? null : formattedEvent,
            receivingPersonId: receivingPersonId ? receivingPersonId.value : null,
        }
        return createAssociatedEvent(input)
            .then(({ data: { createAssociatedEvent: { associatedEvent } } }) =>
                history.push(urls.associatedEventDetails(associatedEvent.id)),
            )
            .catch(formatGeneralReduxFormErrors)
    }

    render() {
        const { handleSubmit, error, formValues } = this.props
        if (!formValues.event.name) return null
        return (
            <Form onSubmit={handleSubmit(this.handleSubmit)} data-e2e="confirmation-page">
                <View marginChildren>
                    <Panel header={`${formValues.receivingPersonId.label}'s Event`}>
                        <View>{formValues.event.name}</View>
                        <View><EventDate event={formValues.event} /></View>
                        <View>
                            {formValues.event.eventTypes.map(({ node }) => (
                                <View key={node.id}>{node.displayName}</View>
                            ))}
                        </View>
                    </Panel>
                    <Button data-e2e="submit" type="submit" block>Create Event</Button>
                    <Alert dismissable unHideWithChildren stackChildren bsStyle="danger">
                        {error}
                    </Alert>
                </View>
            </Form>
        )
    }
}

const formValuesSelector = getFormValues('CreateAssociatedEventForm')
export default compose(
    connect(state => ({
        formValues: formValuesSelector(state),
    })),
    graphql(graphqlQuery, {
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
