// @flow
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { View, Header, Panel, Row, Col } from '../../components'
import { EventDate } from '../../fragmentComponents'

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
            </View>
        )
    }
}

const query = gql`
query PurchaseProduct($associatedEventId: ID!, $productId: ID!) {
    associatedEvent(id: $associatedEventId) {
        receivingPerson {
          fullName
        }
        event {
          name
          ...EventDate
        }
    }
    product(id: $productId) {
        name
        id
        costUsd
        description
        eventTypes {
            edges {
                node {
                    name
                    description
                }
            }
        }
    }
}
${EventDate.fragments.event}
`

export default graphql(query, {
    options: ({ params: { associatedEventId, productId } }) => ({
        variables: { associatedEventId, productId },
    }),
})(PurchaseProduct)
