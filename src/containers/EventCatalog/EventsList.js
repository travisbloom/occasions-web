// @flow
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { Panel, View, Button } from '../../components'
import { EventDate } from '../../fragmentComponents'

class EventsList extends React.Component {
    render() {
        const {
            data: {
                events,
            },
            style,
            onSelectEvent,
        } = this.props

        if (!events) return <span>allllmost</span>
        return (
            <View style={style} marginChildren>
                {events.edges.map(({ node: event }) => (
                    <Panel key={event.id} header={event.name}>
                        <Button onClick={() => onSelectEvent(event)}>Select</Button>
                    </Panel>
                ))}
            </View>
        )
    }
}

const query = gql`
query EventsList($eventSearchValue: String, $selectedEventTypeIds: [ID]) {
  events(eventTypesPkIn: $selectedEventTypeIds, search: $eventSearchValue) {
    edges {
      node {
        id
        pk
        name
        slug
        ...EventDate
      }
    }
  }
}
${EventDate.fragments.event}
`

export default graphql(query, {
    options: ({ eventSearchValue, selectedEventTypes }) => ({
        variables: {
            eventSearchValue,
            selectedEventTypeIds: selectedEventTypes.map(({ value }) => value),
        },
    }),
})(EventsList)
