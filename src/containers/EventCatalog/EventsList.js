// @flow
import React from 'react'
import { graphql } from 'react-apollo'

import { Panel, View, Button } from '../../components'

import graphqlQuery from './EventListQuery.graphql'

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

export default graphql(graphqlQuery, {
    options: ({ eventSearchValue, selectedEventTypes }) => ({
        variables: {
            eventSearchValue,
            eventTypes: selectedEventTypes.map(({ value }) => value),
        },
    }),
})(EventsList)
