// @flow
import React from 'react'
import { graphql } from 'react-apollo'
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
    FormattedDate,
    FormattedNumber,
} from '../../components'
import { EventDate } from '../../fragmentComponents'
import urls from '../../urls'

class TransactionDetails extends React.Component {
    render() {
        const {
            data: {
                transaction,
            },
            style,
        } = this.props
        if (!transaction) return <span>allllmost</span>
        return (
            <DocumentTitle title={`Occasions | Transaction ${transaction.id}`}>
                <View style={style} padding>
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

const query = gql`
query TransactionDetails($transactionId: ID!) {
  transaction(id: $transactionId) {
    id
    datetimeCreated
    receivingPerson {
      id
      fullName
    }
    costUsd
    product {
      id
      name
      description
      mainImageUrl
    }
    associatedEvent {
      id
      event {
        id
        name
        ...EventDate
      }
    }
    associatedLocation {
      id
      location {
        id
        displayName
      }
    }
    productNotes
  }
}
${EventDate.fragments.event}
`

export default graphql(query, {
    options: ({ match: { params: { transactionId } } }) => ({
        variables: { transactionId },
    }),
})(TransactionDetails)
