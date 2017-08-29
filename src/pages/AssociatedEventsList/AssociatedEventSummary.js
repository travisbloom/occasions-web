// @flow
import React from 'react';

import {
  Panel,
  View,
  Row,
  Col,
  Placeholder,
  LinkContainer,
} from '../../components';
import {EventDate} from '../../fragmentComponents';
import urls from '../../urls';

export const AssociatedEventSummaryShell = () => (
  <Panel
    header={
      <View>
        <Placeholder />
      </View>
    }
  >
    <Row>
      <Col xs={6}>
        <View marginChildren>
          <View>
            <Placeholder />
          </View>
          <View>
            <Placeholder />
          </View>
        </View>
      </Col>
      <Col xs={6}>
        <Placeholder />
      </Col>
    </Row>
  </Panel>
);

class AssociatedEventSummary extends React.Component {
  render() {
    const {associatedEvent, index} = this.props;

    return (
      <LinkContainer
        to={urls.associatedEventDetails(associatedEvent.id)}
        data-e2e={`associated-event-summary-${index}`}
      >
        <Panel
          header={
            <View>
              {associatedEvent.receivingPerson.fullName} -{' '}
              {associatedEvent.event.name}
            </View>
          }
        >
          <Row>
            <Col xs={6}>
              <View marginChildren>
                <View>{associatedEvent.receivingPerson.fullName}</View>
                <View>
                  <EventDate event={associatedEvent.event} />
                </View>
              </View>
            </Col>
            <Col xs={6}>
              {associatedEvent.transactions.edges.length ? (
                'Purchased Stuff'
              ) : (
                'Buy Stuff'
              )}
            </Col>
          </Row>
        </Panel>
      </LinkContainer>
    );
  }
}

export default AssociatedEventSummary;
