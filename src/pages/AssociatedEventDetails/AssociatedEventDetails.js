// @flow
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { View, Header } from '../../components'
import { EventDate } from '../../fragmentComponents'

class AssociatedEventDetails extends React.Component {

    render() {
        const {
            data: {
                associatedEvent,
            },
            style,
        } = this.props
        if (!associatedEvent) return <span>allllmost</span>
        return (
            <View style={style} padding>
                <Header size="largest">{associatedEvent.receivingPerson.fullName}</Header>
                <Header size="larger">{associatedEvent.event.name}</Header>
                <Header size="larger"><EventDate event={associatedEvent.event} /></Header>
            </View>
        )
    }
}

const query = gql`
query AssociatedEventDetails($id: ID!) {
  associatedEvent(id: $id) {
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
        ...EventDate
      }
  }
}
${EventDate.fragments.event}
`

export default graphql(query, {
    options: ({ params: { id } }) => ({
        variables: { id },
    }),
})(AssociatedEventDetails)
