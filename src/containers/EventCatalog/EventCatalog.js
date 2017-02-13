// @flow
import React from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import { View, Header, Panel, Label, Row, Col, TextInput, FormField, Select } from '../../components'
import { searchEventTypes } from '../../utilities/search'

import EventsList from './EventsList'

class EventsCatalog extends React.Component {

    state = {
        eventSearchValue: '',
        selectedEventTypes: [],
    }

    handleEventSearchOnChange = eventSearchValue => this.setState({ eventSearchValue })

    handleEventTypeOnChange = selectedEventTypes => this.setState({ selectedEventTypes })

    render() {
        const { selectedEventTypes, eventSearchValue } = this.state
        const {
            client,
            data: {
                eventTypes,
            },
            style,
        } = this.props

        return (
            <View style={style} padding>
                <View style={{ overflowX: 'auto', whiteSpace: 'nowrap' }} marginChildren>
                    {eventTypes && eventTypes.edges.map(({ node: eventType }) =>
                        <View padding inline key={eventType.id}>
                            <Label
                                bsStyle={
                                selectedEventTypes.find(({ value }) => value === eventType.pk) ?
                                'info' : undefined
                            }
                            >
                                {eventType.displayName}
                            </Label>
                        </View>,
                    )}
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
                    eventSearchValue={eventSearchValue}
                    selectedEventTypes={selectedEventTypes}
                />
            </View>
        )
    }
}

const query = gql`
query EventTypes {
  eventTypes(first: 3) {
    edges {
      node {
        id
        pk
        displayName
      }
    }
  }
}
`

export default compose(
    graphql(query),
    withApollo,
)(EventsCatalog)
