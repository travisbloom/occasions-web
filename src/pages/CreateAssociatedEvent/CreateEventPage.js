import React from 'react'
import { reduxForm } from 'redux-form'

import { Button, View, Header, ButtonGroup, Col } from '../../components'
import { EventCatalog } from '../../containers'

class CreateEventPage extends React.Component {
    state = { isDefaultEvent: true };

    handleSetToCustomEvent = () => {
        if (this.state.isDefaultEvent) {
            this.setState({
                isDefaultEvent: false,
            })
        }
    };

    handleSetToDefaultEvent = () => {
        if (!this.state.isDefaultEvent) {
            this.setState({
                isDefaultEvent: true,
            })
        }
    };

    handleSelectEvent = (event) => {
        const { change, submit } = this.props
        change('eventId', event.id)
        change('event', event)
        submit()
    };

    render() {
        const { isDefaultEvent } = this.state

        return (
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
        )
    }
}

export default reduxForm({
    form: 'CreateAssociatedEventForm',
    destroyOnUnmount: false,
})(CreateEventPage)
