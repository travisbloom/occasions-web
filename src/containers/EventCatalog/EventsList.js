// @flow
import * as React from 'react';
import { graphql, compose } from 'react-apollo'

import { Panel, View, Placeholder } from '../../components'
import withApolloFetchingContainer from '../../hoc/withApolloFetchingContainer'

import graphqlQuery from './EventListQuery.graphql'

class EventsList extends React.Component<$FlowFixMeProps> {
    render() {
        const { data: { defaultEvents }, onSelectEvent } = this.props

        return (
            <View marginChildren>
                {defaultEvents.edges.map(({ node: event }, index) => (
                    <Panel
                        data-e2e={`option-event-${index}`}
                        key={event.id}
                        onClick={() => onSelectEvent(event)}
                    >
                        {event.name}
                    </Panel>
                ))}
            </View>
        )
    }
}

export default compose(
    graphql(graphqlQuery, {
        options: ({ eventSearchValue, selectedEventTypes }) => ({
            variables: {
                eventSearchValue,
                eventTypes: selectedEventTypes.map(({ value }) => value),
            },
        }),
    }),
    withApolloFetchingContainer(
        () => (
            <View marginChildren>
                {new Array(6).fill().map((_, index) => (
                    <Panel data-e2e={`option-event-${index}`} key={index}>
                        <Placeholder>Christmas</Placeholder>
                    </Panel>
                ))}
            </View>
        ),
        { fullPage: true }
    )
)(EventsList)
