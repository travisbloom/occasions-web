import React from 'react'
import gql from 'graphql-tag'
import { propType } from 'graphql-anywhere'

import { Panel, View } from '../../components'

const fragment = gql`
    fragment AssociatedEventSummary on AssociatedEventNode {
        receivingPerson {
          fullName
        }
        transactions {
          edges {
            node {
              costUsd
              product {
                name
                mainImageUrl
                description
              }
            }
          }
        }
        event {
          eventType
          name
          dateStart
          timeStart
        }
    }
`

class AssociatedEventSummary extends React.Component {
    static propTypes = {
        associatedEvent: propType(fragment).isRequired,
    };

    render() {
        const { associatedEvent } = this.props

        return (
            <Panel
                header={<View>foo</View>}
            >
                <View>{associatedEvent.receivingPerson.fullName}</View>
                <View>{associatedEvent.event.name} {associatedEvent.event.eventType}</View>
            </Panel>
        )
    }
}

AssociatedEventSummary.fragments = {
    associatedEvent: fragment,
}

export default AssociatedEventSummary
