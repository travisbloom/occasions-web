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
    FormattedDate,
    FormattedNumber,
    Placeholder,
} from '../../components'
import { EventDate } from '../../fragmentComponents'
import urls from '../../urls'
import withShell from '../../hoc/withShell'

import graphqlQuery from './TransactionDetailsQuery.graphql'

class TransactionDetails extends React.Component {
    render() {
        const {
            data: {
                transaction,
            },
        } = this.props
        if (!transaction) return <span>allllmost</span>
        return (
            <DocumentTitle title={`Occasions | Transaction ${transaction.id}`}>
                <View padding>
                    <Header size="largest">
                        Purchased
                        {' '}
                        {transaction.receivingPerson.fullName}
                        {' '}
                        a
                        {' '}
                        {transaction.product.name}
                    </Header>
                    <Header size="larger">
                        On <FormattedDate date={transaction.datetimeCreated} />
                    </Header>
                    <Panel>
                        <Row>
                            <Col xs={4}>Event:</Col>
                            <Col xs={8}>
                                <View>
                                    {transaction.associatedEvent.event.name}
                                </View>
                                <View>
                                    <EventDate event={transaction.associatedEvent.event} />
                                </View>
                            </Col>
                            <Col xs={4}>Cost:</Col>
                            <Col xs={8}>
                                <FormattedNumber currency number={transaction.costUsd} />
                            </Col>
                            <Col xs={4}>Shipping Info:</Col>
                            <Col xs={8}>
                                {transaction.associatedLocation.location.displayName}
                            </Col>
                            <Col xs={4}>
                                <LinkContainer to={urls.associatedEventsList()}>
                                    <Button block>Buy stuff</Button>
                                </LinkContainer>
                            </Col>
                        </Row>
                    </Panel>
                </View>
            </DocumentTitle>
        )
    }
}

TransactionDetails.Shell = () => (
    <View padding>
        <Header size="largest">
            <View><Placeholder /></View>
            <View><Placeholder /></View>
        </Header>
        <Header size="larger">
            <Placeholder />
        </Header>
        <Panel>
            <Row>
                <Col xs={4}><Placeholder /></Col>
                <Col xs={8}>
                    <View>
                        <Placeholder />
                    </View>
                    <View>
                        <Placeholder />
                    </View>
                </Col>
                <Col xs={4}><Placeholder /></Col>
                <Col xs={8}>
                    <Placeholder />
                </Col>
                <Col xs={4}><Placeholder /></Col>
                <Col xs={8}>
                    <Placeholder />
                </Col>
                <Col xs={4}>
                    <Button block><Placeholder /></Button>
                </Col>
            </Row>
        </Panel>
    </View>
)

export default compose(
    graphql(graphqlQuery, {
        options: ({ match: { params: { transactionId } } }) => ({
            variables: { transactionId },
        }),
    }),
    withShell({ isLoaded: ({ data }) => data.transaction }),
)(TransactionDetails)
