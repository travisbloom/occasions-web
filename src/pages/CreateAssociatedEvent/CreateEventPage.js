import React from 'react'
import { reduxForm, formValueSelector } from 'redux-form'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'

import { Button, View, Header, ButtonGroup } from '../../components'
import urls from '../../urls'
import { EventCatalog } from '../../containers'

import CreateEventForm from './CreateEventForm'

class CreateEventPage extends React.Component {
    state = { isDefaultEvent: true }

    componentDidMount() {
        const { eventIdValue, change } = this.props
        // when going back, reset the selected event to ensure the
        // custom event form doesnt break
        if (eventIdValue) {
            change('eventId', null)
            change('event', {})
        }
    }
    handleSetToCustomEvent = () => {
        if (this.state.isDefaultEvent) {
            this.setState({
                isDefaultEvent: false,
            })
        }
    }

    handleSetToDefaultEvent = () => {
        if (!this.state.isDefaultEvent) {
            this.setState({
                isDefaultEvent: true,
            })
        }
    }

    handleSelectEvent = event => {
        const { change } = this.props
        change('eventId', event.id)
        change('event', {
            ...event,
            // format as if it were coming from a select component for consistancy
            eventTypes: event.eventTypes.map(eventType => ({ node: eventType })),
        })
        this.handleSubmit()
    }

    handleSubmit = () => this.props.history.push(`${urls.createAssociatedEvent()}/confirmation`)

    render() {
        const { isDefaultEvent } = this.state

        return (
            <View marginChildren data-e2e="create-event-page">
                <Header>{"What's the Occasion?"}</Header>
                <ButtonGroup block>
                    <Button
                        bsSize="small"
                        data-e2e="toggle-custom-event"
                        onClick={this.handleSetToCustomEvent}
                        bsStyle={isDefaultEvent ? undefined : 'info'}
                    >
                        {'Create New Event'}
                    </Button>
                    <Button
                        bsSize="small"
                        data-e2e="toggle-default-event"
                        onClick={this.handleSetToDefaultEvent}
                        bsStyle={isDefaultEvent ? 'info' : undefined}
                    >
                        {'Choose Holiday'}
                    </Button>
                </ButtonGroup>
                {isDefaultEvent ? (
                    <EventCatalog onSelectEvent={this.handleSelectEvent} />
                ) : (
                    <CreateEventForm />
                )}
            </View>
        )
    }
}

const selector = formValueSelector('CreateAssociatedEventForm')
export default compose(
    connect(state => ({
        eventIdValue: selector(state, 'eventId'),
    })),
    reduxForm({
        form: 'CreateAssociatedEventForm',
        destroyOnUnmount: false,
    }),
    withRouter
)(CreateEventPage)
