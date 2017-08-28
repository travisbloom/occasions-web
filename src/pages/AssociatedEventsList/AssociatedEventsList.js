// @flow
import React from 'react'
import { graphql, compose } from 'react-apollo'
import DocumentTitle from 'react-document-title'

import { View, Button, LinkContainer } from '../../components'
import urls from '../../urls'
import withApolloFetchingContainer from '../../hoc/withApolloFetchingContainer'
import type { AssociatedEventsListQuery } from '../../types/schema'

import AssociatedEventSummary, { AssociatedEventSummaryShell } from './AssociatedEventSummary'
import graphqlQuery from './AssociatedEventsListQuery.graphql'

class AssociatedEventsList extends React.Component {
    props: {
        data: AssociatedEventsListQuery,
        renderWhenReady: () => any,
    }
    renderBody = () => (
        <View marginChildren>
            {this.props.data.currentUser.person.createdEvents.edges.map(({ node }, index) => (
                <AssociatedEventSummary key={node.id} index={index} associatedEvent={node} />
            ))}
        </View>
    )

    render() {
        const { renderWhenReady } = this.props
        return (
            <DocumentTitle title="Occasions | My Events">
                <View marginChildren data-e2e="page-associated-events-list">
                    <View>
                        <LinkContainer to={urls.createAssociatedEvent()}>
                            <Button block bsStyle="primary">
                                Add An Event
                            </Button>
                        </LinkContainer>
                    </View>
                    {renderWhenReady(this.renderBody)}
                </View>
            </DocumentTitle>
        )
    }
}
export default compose(
    graphql(graphqlQuery),
    withApolloFetchingContainer(() => (
        <View marginChildren>
            {new Array(4).fill().map((_, index) => <AssociatedEventSummaryShell key={index} />)}
        </View>
    )),
)(AssociatedEventsList)
