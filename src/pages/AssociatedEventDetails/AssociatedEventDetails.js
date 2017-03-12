// @flow
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { View, Header, Panel, Row, Col, LinkContainer, Button } from '../../components'
import { EventDate } from '../../fragmentComponents'
import urls from '../../urls'

class AssociatedEventDetails extends React.Component {
    render() {
        const {
            data: {
                associatedEvent,
            },
            style,
        } = this.props
        if (!associatedEvent) return <span>allllmost</span>
        return (
            <View style={style} padding marginChildren>
                <Header size="largest">
                    {associatedEvent.receivingPerson.fullName}
                </Header>
                <Header size="larger">{associatedEvent.event.name}</Header>
                <Header size="larger">
                    <EventDate event={associatedEvent.event} />
                </Header>
                {associatedEvent.event.relatedProducts.edges.map(({ node }) => (
                    <Panel key={node.id} title={<Header size="large">{node.name}</Header>}>
                        <Row>
                            <Col xs={8} lg={10}>{node.description}</Col>
                            <Col xs={4} lg={2}>
                                <LinkContainer
                                    to={urls.purchaseProduct(associatedEvent.id, node.slug)}
                                >
                                    <Button block bsStyle="primary">
                                        Buy
                                    </Button>
                                </LinkContainer>
                            </Col>
                        </Row>
                    </Panel>
                ))}
            </View>
        )
    }
}

const query = gql`
query AssociatedEventDetails($associatedEventId: ID!) {
  associatedEvent(id: $associatedEventId) {
      id
      receivingPerson {
        id
        fullName
      }
      transactions {
        edges {
          node {
            id
            costUsd
            product {
              id
              name
              mainImageUrl
              description
            }
          }
        }
      }
      event {
        id
        name
        relatedProducts {
            edges {
              node {
                name
                description
                id
                slug
              }
            }
          }
        ...EventDate
      }
  }
}
${EventDate.fragments.event}
`

export default graphql(query, {
    options: ({ match: { params: { associatedEventId } } }) => ({
        variables: { associatedEventId },
    }),
})(AssociatedEventDetails)
