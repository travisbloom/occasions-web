// @flow
import React from 'react';
import {graphql, compose, withApollo} from 'react-apollo';
import _ from 'lodash';

import {
  View,
  Row,
  Col,
  TextInput,
  FormField,
  Select,
  MediaQuery,
} from '../../components';
import {searchEventTypes} from '../../utilities/search';

import EventsList from './EventsList';
import graphqlQuery from './EventCatalogQuery.graphql';

class EventsCatalog extends React.Component {
  props: {
    onSelectEvent: () => void,
  };

  state = {
    eventSearchValue: '',
    selectedEventTypes: [],
  };

  handleEventSearchOnChange = eventSearchValue =>
    this.setState({eventSearchValue});

  handleEventTypeOnChange = selectedEventTypes =>
    this.setState({selectedEventTypes});

  handleClickedLabel = eventType =>
    this.setState(state => ({
      selectedEventTypes: _.xorWith(
        state.selectedEventTypes,
        [
          {
            label: eventType.displayName,
            value: eventType.id,
          },
        ],
        _.isEqual
      ),
    }));

  render() {
    const {selectedEventTypes, eventSearchValue} = this.state;
    const {client, onSelectEvent} = this.props;

    return (
      <View marginChildren>
        <MediaQuery sm>
          {matches => (
            <Row>
              {matches && (
                <Col xs={12} sm={4}>
                  <FormField label="Filter Events">
                    <TextInput
                      onChange={this.handleEventSearchOnChange}
                      value={eventSearchValue}
                    />
                  </FormField>
                </Col>
              )}
              <Col xs={12} sm={8}>
                <FormField label="Filter Types">
                  <Select
                    multi
                    loadOptions={searchEventTypes(client)}
                    onChange={this.handleEventTypeOnChange}
                    value={selectedEventTypes}
                  />
                </FormField>
              </Col>
            </Row>
          )}
        </MediaQuery>
        <EventsList
          onSelectEvent={onSelectEvent}
          eventSearchValue={eventSearchValue}
          selectedEventTypes={selectedEventTypes}
        />
      </View>
    );
  }
}

export default compose(graphql(graphqlQuery), withApollo)(EventsCatalog);
