// @flow
import React from 'react'
import { graphql, compose } from 'react-apollo'
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

import graphqlQuery from './AssociatedEventDetailsQuery.graphql'

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
                    `Occasions | ${node ? `${associatedEvent.receivingPerson.fullName} - ${associatedEvent.event.name}` : 'Event Details'}`
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
                    {associatedEvent.event.relatedProducts.edges.map(({ node: product }) => (
                        <Panel
                            key={product.id}
                            header={<Header size="large">{product.name}</Header>}
                        >
                            <Row>
                                <Col xs={8} lg={10}>{product.description}</Col>
                                <Col xs={4} lg={2}>
                                    <LinkContainer
                                        to={urls.purchaseProduct(associatedEvent.id, product.id)}
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

AssociatedEventDetails.Shell = () => (
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

export default compose(
    graphql(graphqlQuery, {
        options: ({ match: { params: { associatedEventId } } }) => ({
            variables: { associatedEventId },
        }),
    }),
    withShell({ isLoaded: props => !!props.data.node }),
)(AssociatedEventDetails)
