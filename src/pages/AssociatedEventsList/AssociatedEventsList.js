// @flow
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import DocumentTitle from 'react-document-title'

import { View, Button, LinkContainer } from '../../components'
import urls from '../../urls'

import AssociatedEventSummary from './AssociatedEventSummary'

class AssociatedEventsList extends React.Component {
    renderEvents = () => {
        const {
            data: {
                currentUser,
                // loading,
            },
        } = this.props
        if (!currentUser) return null

        return (
            <View marginChildren>
                {currentUser.person.createdEvents.edges.map(({ node }) => (
                    <AssociatedEventSummary key={node.id} associatedEvent={node} />
                ))}
            </View>
        )
    };

    render() {
        return (
            <DocumentTitle title="Occasions | My Events">
                <View marginChildren padding>
                    <View>
                        <LinkContainer to={urls.createAssociatedEvent()}>
                            <Button block bsStyle="info">Add An Event</Button>
                        </LinkContainer>
                    </View>
                    {this.renderEvents()}
                </View>
            </DocumentTitle>
        )
    }
}

const query = gql`
query AssociatedEventsList {
  currentUser {
    id
    person {
      id
      fullName
      createdEvents(first: 10) {
        edges {
          node {
            id
            ...AssociatedEventSummary
          }
        }
      }
    }
  }
}
${AssociatedEventSummary.fragments.associatedEvent}
`

export default graphql(query)(AssociatedEventsList)
