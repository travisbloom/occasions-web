// @flow
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { View, Header, Panel, Row, Col } from '../../components'

import CreateAssociatedEventForm from './CreateAssociatedEventForm'

class CreateAssociatedEvent extends React.Component {

    render() {
        const {
            data: {
                products,
                currentUser,
            },
            style,
        } = this.props

        if (!products) return <span>allllmost</span>
        return (
            <View style={style} padding>
                <CreateAssociatedEventForm
                    products={products}
                    currentUser={currentUser}
                />
            </View>
        )
    }
}

const query = gql`
query CreateAssociatedEvent {
    currentUser {
      id
      person {
        id
        fullName
      }
    }
    products {
        edges {
            node {
                name
                id
                slug
                costUsd
                description
                eventTypes {
                    edges {
                        node {
                            id
                            name
                            displayName
                        }
                    }
                }
            }
        }
    }
}
`

export default graphql(query, {
    options: () => ({
        variables: { },
    }),
})(CreateAssociatedEvent)
