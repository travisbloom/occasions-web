// @flow
import React from 'react';
import {graphql, compose} from 'react-apollo';
import DocumentTitle from 'react-document-title';

import {
  View,
  LinkContainer,
  Panel,
  Placeholder,
  FormattedDate,
  Row,
  Col,
} from '../../components';
import urls from '../../urls';
import withApolloFetchingContainer from '../../hoc/withApolloFetchingContainer';
import type {TransactionListQuery} from '../../types/schema';

import graphqlQuery from './TransactionListQuery.graphql';

class TransactionList extends React.Component {
  props: {
    data: TransactionListQuery,
    renderWhenReady: () => any,
  };
  renderBody = () => (
    <View marginChildren>
      {this.props.data.currentUser.transactions.edges.map(({node}, index) => (
        <LinkContainer
          data-e2e={`transaction-link-${index}`}
          to={urls.transactionDetails(node.id)}
          key={node.id}
        >
          <Panel
            header={
              <Row>
                <Col xs={6}>{node.receivingPerson.fullName}</Col>
                <Col xs={6} style={{textAlign: 'right'}}>
                  <FormattedDate date={node.datetimeCreated} />
                </Col>
              </Row>
            }
          >
            {node.product.name}
          </Panel>
        </LinkContainer>
      ))}
    </View>
  );
  render() {
    return (
      <DocumentTitle title="Occasions | Gifts">
        <View marginChildren data-e2e="transaction-list-page">
          {this.props.renderWhenReady(this.renderBody)}
        </View>
      </DocumentTitle>
    );
  }
}
export default compose(
  graphql(graphqlQuery),
  withApolloFetchingContainer(() => (
    <View marginChildren>
      {new Array(4).fill().map((_, index) => (
        <Panel key={index}>
          <Placeholder />
        </Panel>
      ))}
    </View>
  ))
)(TransactionList);
