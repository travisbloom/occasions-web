import React from 'react'
import gql from 'graphql-tag'
import { propType } from 'graphql-anywhere'
import { withRouter } from 'react-router-dom'

import { Panel, View, Row, Col } from '../../components'
import { EventDate } from '../../fragmentComponents'
import urls from '../../urls'

const fragment = gql`
    fragment AssociatedEventSummary on AssociatedEventNode {
        id
        receivingPerson {
          id
          fullName
        }
        transactions {
          edges {
            node {
              id
            }
          }
        }
        event {
          id
          name
          ...EventDate
        }
    }
    ${EventDate.fragments.event}
`

class AssociatedEventSummary extends React.Component {
    static propTypes = {
        associatedEvent: propType(fragment).isRequired,
    };

    transitionToDetailsPage = () => {
        const { associatedEvent, history } = this.props
        history.push(urls.associatedEventDetails(associatedEvent.id))
    };

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
                        <View>{associatedEvent.receivingPerson.fullName}</View>
                        <View><EventDate event={associatedEvent.event} /></View>
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

const wrappedComponent = withRouter(AssociatedEventSummary)
wrappedComponent.fragments = {
    associatedEvent: fragment,
}
export default wrappedComponent
