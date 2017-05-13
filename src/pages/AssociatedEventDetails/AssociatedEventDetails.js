// @flow
import React from 'react'
import { graphql, compose } from 'react-apollo'
import DocumentTitle from 'react-document-title'

import { View, Header, Panel, Row, Col, LinkContainer, Button, Placeholder } from '../../components'
import { EventDate } from '../../fragmentComponents'
import withApolloFetchingContainer from '../../hoc/withApolloFetchingContainer'
import urls from '../../urls'
import type { AssociatedEventDetailsQuery } from '../../types/schema'

import graphqlQuery from './AssociatedEventDetailsQuery.graphql'

class AssociatedEventDetails extends React.Component {
    props: {
        data: AssociatedEventDetailsQuery,
    }
    render() {
        const { data: { associatedEvent } } = this.props

        return (
            <DocumentTitle
                title={`Occasions | ${associatedEvent ? `${associatedEvent.receivingPerson.fullName} - ${associatedEvent.event.name}` : 'Event Details'}`}
            >
                <View padding>
                    <Header size="largest">
                        {associatedEvent.receivingPerson.fullName}
                    </Header>
                    <Header size="larger">{associatedEvent.event.name}</Header>
                    <Header size="larger">
                        <EventDate event={associatedEvent.event} />
                    </Header>
                    <View marginChildren marginTop>
                        {associatedEvent.event.relatedProducts.edges.map(({ node: product }) => (
                            <Panel
                                key={product.id}
                                header={<Header size="large">{product.name}</Header>}
                            >
                                <Row>
                                    <Col xs={8} lg={10}>{product.description}</Col>
                                    <Col xs={4} lg={2}>
                                        <LinkContainer
                                            to={urls.purchaseProduct(
                                                associatedEvent.id,
                                                product.id,
                                            )}
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
                </View>
            </DocumentTitle>
        )
    }
}

const Shell = () => (
    <View padding>
        <Header size="largest"><Placeholder>Travis Bloomberg</Placeholder></Header>
        <Header size="larger"><Placeholder>Valentines Day</Placeholder></Header>
        <Header size="larger"><Placeholder>Jan 4th, 1991</Placeholder></Header>
        <View marginChildren marginTop>
            {new Array(4).fill().map((_, index) => (
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
    </View>
)

export default compose(
    graphql(graphqlQuery, {
        options: ({ match: { params: { associatedEventId } } }) => ({
            variables: { associatedEventId },
        }),
    }),
    withApolloFetchingContainer(Shell, { fullPage: true }),
)(AssociatedEventDetails)
