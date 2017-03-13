// @flow
import React from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import DocumentTitle from 'react-document-title'

import {
    View,
    Header,
    Panel,
    Row,
    Col,
    LinkContainer,
    Button,
    Placeholder,
} from '../../components'
import { EventDate } from '../../fragmentComponents'
import withShell from '../../hoc/withShell'
import urls from '../../urls'

const AssociatedEventDetailsPlaceholder = () => (
    <View padding marginChildren>
        <Header size="largest"><Placeholder /></Header>
        <Header size="larger"><Placeholder width={55} /></Header>
        <Header size="larger"><Placeholder width={45} /></Header>
        {new Array(2).fill().map((_, index) => (
            <Panel key={index} header={<Header size="large"><Placeholder /></Header>}>
                <View marginChildren>
                    <Row>
                        <Col xs={8} lg={10}>
                            <View marginChildren>
                                <View><Placeholder /></View>
                                <View><Placeholder /></View>
                            </View>
                        </Col>
                        <Col xs={4} lg={2}>
                            <Button block bsStyle="primary">
                                <Placeholder light />
                            </Button>
                        </Col>
                    </Row>
                </View>
            </Panel>
        ))}
    </View>
)

class AssociatedEventDetails extends React.Component {
    render() {
        const {
            data: {
                associatedEvent,
            },
            style,
        } = this.props
        return (
            <DocumentTitle
                title={
                    `Occasions | ${associatedEvent ? `${associatedEvent.receivingPerson.fullName} - ${associatedEvent.event.name}` : 'Event Details'}`
                }
            >
                <View style={style} padding marginChildren>
                    <Header size="largest">
                        {associatedEvent.receivingPerson.fullName}
                    </Header>
                    <Header size="larger">{associatedEvent.event.name}</Header>
                    <Header size="larger">
                        <EventDate event={associatedEvent.event} />
                    </Header>
                    {associatedEvent.event.relatedProducts.edges.map(({ node }) => (
                        <Panel key={node.id} header={<Header size="large">{node.name}</Header>}>
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
            </DocumentTitle>
        )
    }
}

AssociatedEventDetails.Placeholder = AssociatedEventDetailsPlaceholder

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

export default compose(
    graphql(query, {
        options: ({ match: { params: { associatedEventId } } }) => ({
            variables: { associatedEventId },
        }),
    }),
    withShell,
)(AssociatedEventDetails)
