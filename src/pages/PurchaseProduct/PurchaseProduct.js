// @flow
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { View, Header, Panel, Row, Col } from '../../components'
import { EventDate } from '../../fragmentComponents'

import PurchaseProductForm from './PurchaseProductForm'

class PurchaseProduct extends React.Component {

    render() {
        const {
            data: {
                associatedEvent,
                product,
            },
            style,
        } = this.props
        if (!associatedEvent) return <span>allllmost</span>
        return (
            <View style={style} padding>
                <Header size="largest">{product.name}</Header>
                <Header size="larger">For {associatedEvent.receivingPerson.fullName}</Header>
                <PurchaseProductForm associatedEvent={associatedEvent} />
            </View>
        )
    }
}

const query = gql`
query PurchaseProduct($associatedEventId: ID!, $productSlug: ID!) {
    associatedEvent(id: $associatedEventId) {
        receivingPerson {
          fullName
          associatedLocations {
              edges {
                  node {
                      location {
                          displayName
                      }
                  }
              }
          }
        }
        event {
          name
          ...EventDate
        }
    }
    product(slug: $productSlug) {
        name
        id
        slug
        costUsd
        description
        eventTypes {
            edges {
                node {
                    name
                    displayName
                }
            }
        }
    }
}
${EventDate.fragments.event}
`

export default graphql(query, {
    options: ({ params: { associatedEventId, productSlug } }) => ({
        variables: { associatedEventId, productSlug },
    }),
})(PurchaseProduct)
