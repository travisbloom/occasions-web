// @flow
import React from 'react'
import { withRouter } from 'react-router-dom'

import { Panel, View, Row, Col, Placeholder } from '../../components'
import { EventDate } from '../../fragmentComponents'
import urls from '../../urls'

class AssociatedEventSummary extends React.Component {
    Shell = () => (
        <Panel header={<View><Placeholder /></View>}>
            <Row>
                <Col xs={6}>
                    <View marginChildren>
                        <View><Placeholder /></View>
                        <View><Placeholder /></View>
                    </View>
                </Col>
                <Col xs={6}>
                    <Placeholder />
                </Col>
            </Row>
        </Panel>
    )
    transitionToDetailsPage = () => {
        const { associatedEvent, history } = this.props
        history.push(urls.associatedEventDetails(associatedEvent.id))
    }

    render() {
        const { associatedEvent } = this.props

        return (
            <Panel
                onClick={this.transitionToDetailsPage}
                header={
                    <View>
                        {associatedEvent.receivingPerson.fullName} - {associatedEvent.event.name}
                    </View>
                }
            >
                <Row>
                    <Col xs={6}>
                        <View marginChildren>
                            <View>{associatedEvent.receivingPerson.fullName}</View>
                            <View><EventDate event={associatedEvent.event} /></View>
                        </View>
                    </Col>
                    <Col xs={6}>
                        {associatedEvent.transactions.edges.length
                            ? 'Purchased Stuff'
                            : 'Buy Stuff'}
                    </Col>
                </Row>
            </Panel>
        )
    }
}

export default withRouter(AssociatedEventSummary)
