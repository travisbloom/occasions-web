// @flow
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { Header, View } from '../../components'

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
            <View>
                {currentUser.person.createdEvents.edges.map(({ node }) =>
                    <AssociatedEventSummary key={node.id} associatedEvent={node} />,
                )}
            </View>
        )
    }

    render() {
        const {
            data: {
                currentUser,
                loading,
            },
            style,
        } = this.props
        return (
            <View style={style} padding>
                <Header size="largest">HELLO {currentUser && currentUser.username}!</Header>
                {this.renderContent()}
            </View>
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

export default graphql(query)(Home)
