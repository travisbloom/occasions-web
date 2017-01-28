// @flow
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { Header } from '../../components'

import AssociatedEventSummary from './AssociatedEventSummary'

class Home extends React.Component {

    renderContent = () => {
        const {
            data: {
                currentUser,
                loading,
            },
        } = this.props
        if (!currentUser) return null

        return (
            <div>
                {currentUser.person.createdEvents.edges.map(({ node }) =>
                    <AssociatedEventSummary key={node.id} associatedEvent={node} />,
                )}
            </div>
        )
    }

    render() {
        const {
            data: {
                currentUser,
                loading,
            },
        } = this.props
        return (
            <div>
                <Header size="largest">HELLO {currentUser && currentUser.username}!</Header>
                {this.renderContent()}
            </div>
        )
    }
}

const query = gql`
query Home {
  currentUser {
    person {
      fullName
      createdEvents {
        edges {
          node {
            ...AssociatedEventSummary
          }
        }
      }
    }
  }
}
${AssociatedEventSummary.fragments.associatedEvent}
`

export default graphql(query)(Home)
