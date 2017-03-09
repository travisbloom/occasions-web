import React from 'react'
import { reduxForm } from 'redux-form'

import { Button, View, Header, Row, Col } from '../../components'
import { EventCatalog } from '../../containers'

class CreateEventPage extends React.Component {
    state = { isDefaultEvent: true };

    toggleIsDefaultEvent = () => this.setState(state => ({
        isDefaultEvent: !state.isDefaultEvent,
    }));

    handleSelectEvent = (event) => {
        const { change, submit } = this.props
        change('eventId', event.pk)
        change('event', event)
        submit()
    };

    render() {
        const { isDefaultEvent } = this.state

        return (
            <View marginChildren>
                <Header>{"What's the Occasion?"}</Header>
                <Row>
                    <Col xs={6}>
                        <Button
                            disabled={!isDefaultEvent}
                            onClick={this.toggleIsDefaultEvent}
                            bsSize="small"
                        >
                            {'Create A Personalized Event'}
                        </Button>
                    </Col>
                    <Col xs={6}>
                        <Button
                            disabled={isDefaultEvent}
                            onClick={this.toggleIsDefaultEvent}
                            bsSize="small"
                        >
                            {'Choose A Holiday'}
                        </Button>
                    </Col>
                </Row>
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
