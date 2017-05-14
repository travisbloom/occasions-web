import React from 'react'
import { reduxForm, Form } from 'redux-form'
import { withRouter } from 'react-router-dom'
import { compose } from 'react-apollo'

import { Button, View, Header, ButtonGroup } from '../../components'
import urls from '../../urls'
import { EventCatalog } from '../../containers'

class CreateEventPage extends React.Component {
    state = { isDefaultEvent: true }

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

    handleSelectEvent = (event) => {
        const { change } = this.props
        change('eventId', event.id)
        change('event', event)
        this.handleSubmit()
    }

    handleSubmit = () => this.props.history.push(`${urls.createAssociatedEvent()}/confirmation`)

    render() {
        const { isDefaultEvent } = this.state
        return (
            <Form>
                <View marginChildren>
                    <Header>{"What's the Occasion?"}</Header>
                    <ButtonGroup block>
                        <Button
                            bsSize="small"
                            onClick={this.handleSetToCustomEvent}
                            bsStyle={isDefaultEvent ? undefined : 'info'}
                        >
                            {'Create New Event'}
                        </Button>
                        <Button
                            bsSize="small"
                            onClick={this.handleSetToDefaultEvent}
                            bsStyle={isDefaultEvent ? 'info' : undefined}
                        >
                            {'Choose Holiday'}
                        </Button>
                    </ButtonGroup>
                    {isDefaultEvent
                        ? <EventCatalog onSelectEvent={this.handleSelectEvent} />
                        : <View>foobar</View>}
                </View>
            </Form>
        )
    }
}

export default compose(
    reduxForm({
        form: 'CreateAssociatedEventForm',
        destroyOnUnmount: false,
    }),
    withRouter,
)(CreateEventPage)
