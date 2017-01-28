import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { propType } from 'graphql-anywhere'

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
            <div key={associatedEvent.id}>
                <div>{associatedEvent.receivingPerson.fullName}</div>
                <div>{associatedEvent.event.name} {associatedEvent.event.eventType}</div>
            </div>
        )
    }
}

AssociatedEventSummary.fragments = {
    associatedEvent: fragment,
}

export default AssociatedEventSummary
