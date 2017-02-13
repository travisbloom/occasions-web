// @flow
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { View } from '../../components'

class EventsList extends React.Component {

    render() {
        const {
            data: {
                events,
            },
            style,
        } = this.props

        if (!events) return <span>allllmost</span>
        return (
            <View style={style} padding>
                {events.edges.map(({ node: event }) =>
                    <View key={event.id}>
                        {event.name}
                    </View>,
                )}
            </View>
        )
    }
}

const query = gql`
query EventsList($eventSearchValue: String, $selectedEventTypeIds: [ID]) {
  events(eventTypesIdIn: $selectedEventTypeIds, search: $eventSearchValue) {
    edges {
      node {
        id
        name
        slug
      }
    }
  }
}
`

export default graphql(query, {
    options: ({ eventSearchValue, selectedEventTypes }) => ({
        variables: {
            eventSearchValue,
            selectedEventTypeIds: selectedEventTypes.map(({ value }) => value),
        },
    }),
})(EventsList)
