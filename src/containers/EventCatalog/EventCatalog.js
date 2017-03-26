// @flow
import React from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import _ from 'lodash'

import { View, Label, Row, Col, TextInput, FormField, Select } from '../../components'
import { searchEventTypes } from '../../utilities/search'

import EventsList from './EventsList'
import graphqlQuery from './EventCatalogQuery.graphql'

class EventsCatalog extends React.Component {
    static propTypes = {
        onSelectEvent: React.PropTypes.func.isRequired,
    };

    state = {
        eventSearchValue: '',
        selectedEventTypes: [],
    };

    handleEventSearchOnChange = eventSearchValue => this.setState({ eventSearchValue });

    handleEventTypeOnChange = selectedEventTypes => this.setState({ selectedEventTypes });

    handleClickedLabel = eventType => this.setState(state => ({
        selectedEventTypes: _.xorWith(
            state.selectedEventTypes,
            [
                {
                    label: eventType.displayName,
                    value: eventType.id,
                },
            ],
            _.isEqual,
        ),
    }));

    render() {
        const { selectedEventTypes, eventSearchValue } = this.state
        const {
            client,
            data: {
                eventTypes,
            },
            onSelectEvent,
        } = this.props

        return (
            <View marginChildren>
                <View style={{ overflowX: 'auto', whiteSpace: 'nowrap' }} marginChildrenRight>
                    {eventTypes &&
                        eventTypes.edges.map(({ node: eventType }) => (
                            <View
                                inline
                                key={eventType.id}
                                onClick={() => this.handleClickedLabel(eventType)}
                            >
                                <Label
                                    bsStyle={
                                        selectedEventTypes.find(
                                            ({ value }) => value === eventType.id,
                                        )
                                            ? 'info'
                                            : undefined
                                    }
                                >
                                    {eventType.displayName}
                                </Label>
                            </View>
                        ))}
                </View>
                <Row>
                    <Col xs={4}>
                        <FormField label="Filter Events">
                            <TextInput
                                onChange={this.handleEventSearchOnChange}
                                value={eventSearchValue}
                            />
                        </FormField>
                    </Col>
                    <Col xs={8}>
                        <FormField label="Filter Types">
                            <Select
                                remote
                                multi
                                loadOptions={searchEventTypes(client)}
                                onChange={this.handleEventTypeOnChange}
                                value={selectedEventTypes}
                            />
                        </FormField>
                    </Col>
                </Row>
                <EventsList
                    onSelectEvent={onSelectEvent}
                    eventSearchValue={eventSearchValue}
                    selectedEventTypes={selectedEventTypes}
                />
            </View>
        )
    }
}

export default compose(graphql(graphqlQuery), withApollo)(EventsCatalog)
