// @flow
import React from 'react'
import { graphql } from 'react-apollo'
import DocumentTitle from 'react-document-title'

import { View, Button, LinkContainer } from '../../components'
import urls from '../../urls'
import withShell from '../../hoc/withShell'
import type { AssociatedEventsListQuery } from '../../types/schema'

import AssociatedEventSummary, { AssociatedEventSummaryShell } from './AssociatedEventSummary'
import graphqlQuery from './AssociatedEventsListQuery.graphql'

const RenderedList = ({ currentUser }) => (
    <View marginChildren>
        {currentUser.person.createdEvents.edges.map(({ node }) => (
            <AssociatedEventSummary key={node.id} associatedEvent={node} />
        ))}
    </View>
)
const RenderedListShell = () => (
    <View marginChildren>
        {new Array(4).fill().map((_, index) => <AssociatedEventSummaryShell key={index} />)}
    </View>
)
const WrappedRenderList = withShell({
    shell: RenderedListShell,
    isLoaded: ({ currentUser }) => currentUser.person.createdEvents,
})(RenderedList)

class AssociatedEventsList extends React.Component {
    props: {
        data: AssociatedEventsListQuery,
    }
    render() {
        const { data: { currentUser } } = this.props
        return (
            <DocumentTitle title="Occasions | My Events">
                <View marginChildren padding data-e2e="page-associated-events-list">
                    <View>
                        <LinkContainer to={urls.createAssociatedEvent()}>
                            <Button block bsStyle="info">Add An Event</Button>
                        </LinkContainer>
                    </View>
                    <WrappedRenderList currentUser={currentUser} />
                </View>
            </DocumentTitle>
        )
    }
}
export default graphql(graphqlQuery)(AssociatedEventsList)
