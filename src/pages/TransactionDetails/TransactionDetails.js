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
    Table,
    Button,
    FormattedDate,
    FormattedNumber,
    Placeholder,
} from '../../components'
import { EventDate } from '../../fragmentComponents'
import urls from '../../urls'
import withApolloFetchingContainer from '../../hoc/withApolloFetchingContainer'

import graphqlQuery from './TransactionDetailsQuery.graphql'

const LineItem = ({ label, children }) => (
    <tr>
        <td xs={4}>{label}</td>
        <td xs={8}>{children}</td>
    </tr>
)

class TransactionDetails extends React.Component {
    render() {
        const { data: { transaction } } = this.props
        return (
            <DocumentTitle title={`Occasions | Transaction ${transaction.id}`}>
                <View data-e2e="page-transaction-details">
                    <Header size="large">
                        <FormattedDate date={transaction.datetimeCreated} showTime />
                    </Header>
                    <View marginBottom>
                        <Header size="largest">{transaction.receivingPerson.fullName}</Header>
                    </View>
                    <Panel>
                        <Row>
                            <Col xs={4}>
                                <View marginChildren>{transaction.productNotes}</View>
                            </Col>
                            <Col xs={8}>
                                <Table striped bordered>
                                    <tbody>
                                        <LineItem label="Cost">
                                            <FormattedNumber
                                                currency
                                                number={transaction.costUsd}
                                            />
                                        </LineItem>
                                        <LineItem label="Event">
                                            {transaction.associatedEvent.event.name}
                                            {' - '}
                                            <EventDate
                                                eventDate={transaction.associatedEventDate}
                                                event={transaction.associatedEvent.event}
                                            />
                                        </LineItem>
                                        <LineItem label="Shipping Info">
                                            {transaction.associatedLocation.location.displayName}
                                        </LineItem>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Panel>
                </View>
            </DocumentTitle>
        )
    }
}

const Shell = () => (
    <View data-e2e="page-transaction-details">
        <Header size="large">
            <Placeholder>May 22nd 2017 at 10:51 PM</Placeholder>
        </Header>
        <View marginBottom>
            <Header size="largest">
                <Placeholder>Travis Bloom</Placeholder>
            </Header>
        </View>
        <Panel>
            <Row>
                <Col xs={4}>
                    <View marginChildren>
                        <Placeholder>
                            Something that would be written on a card. This is a person that needs
                            to say hello to you.
                        </Placeholder>
                    </View>
                </Col>
                <Col xs={8}>
                    <Table striped bordered>
                        <tbody>
                            <LineItem label={<Placeholder>Cost</Placeholder>}>
                                <Placeholder>$2</Placeholder>
                            </LineItem>
                            <LineItem label={<Placeholder>Event</Placeholder>}>
                                <Placeholder>Valentines Day - May 22nd</Placeholder>
                            </LineItem>
                            <LineItem label={<Placeholder>Shipping Info</Placeholder>}>
                                <Placeholder>1 Main St. Apt #1, city_1 CA 11112</Placeholder>
                            </LineItem>
                        </tbody>
                    </Table>
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
    withApolloFetchingContainer(Shell, { fullPage: true }),
)(TransactionDetails)
