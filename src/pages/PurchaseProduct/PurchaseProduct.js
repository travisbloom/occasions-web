// @flow
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import DocumentTitle from 'react-document-title'

import { View, Header } from '../../components'
import { EventDate } from '../../fragmentComponents'

import PurchaseProductForm from './PurchaseProductForm'

class PurchaseProduct extends React.Component {
    render() {
        const {
            data: {
                associatedEvent,
                product,
                currentUser,
                refetch,
            },
            style,
        } = this.props

        if (!associatedEvent) return <span>allllmost</span>
        const pageTitleInfo = associatedEvent
            ? `for ${associatedEvent.receivingPerson.fullName} - ${associatedEvent.event.name}`
            : 'Details'
        return (
            <DocumentTitle title={`Occasions | Gift ${pageTitleInfo}`}>
                <View style={style} padding>
                    <Header size="largest">{product.name}</Header>
                    <Header size="larger">
                        For {associatedEvent.receivingPerson.fullName}
                    </Header>
                    <PurchaseProductForm
                        initialValues={{
                            receivingPersonId: associatedEvent.receivingPerson.pk,
                            productId: product.slug,
                            productNotes: '',
                            associatedEventId: associatedEvent.pk,
                        }}
                        refetch={refetch}
                        associatedEvent={associatedEvent}
                        product={product}
                        currentUser={currentUser}
                    />
                </View>
            </DocumentTitle>
        )
    }
}

const query = gql`
query PurchaseProduct($associatedEventId: ID!, $productSlug: ID!) {
    currentUser {
      email
      hasStripeUser
      id
      person {
        id
        fullName
      }
    }
    associatedEvent(id: $associatedEventId) {
        pk
        id
        receivingPerson {
          fullName
          pk
          id
          associatedLocations {
              edges {
                  node {
                      id
                      pk
                      location {
                          id
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
                    id
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
    options: ({ match: { params: { associatedEventId, productSlug } } }) => ({
        variables: { associatedEventId, productSlug },
    }),
})(PurchaseProduct)
