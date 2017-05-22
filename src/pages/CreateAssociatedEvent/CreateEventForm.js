// @flow
import React from 'react'
import { reduxForm, Form, FormSection } from 'redux-form'
import { withRouter } from 'react-router-dom'
import { compose, withApollo } from 'react-apollo'

import {
    ReduxFormField,
    Button,
    View,
    DatePicker,
    Select,
    TextInput,
    Col,
    Row,
} from '../../components'
import { searchEventTypes } from '../../utilities/search'

import urls from '../../urls'
import validate from './validate'

class CreateEventForm extends React.Component {
    handleSubmit = () => this.props.history.push(`${urls.createAssociatedEvent()}/confirmation`)

    render() {
        const { client, handleSubmit } = this.props

        return (
            <Form onSubmit={handleSubmit(this.handleSubmit)}>
                <FormSection name="event">
                    <View marginChildren data-e2e="create-event-form">
                        <Row>
                            <Col xs={12} md={6}>
                                <ReduxFormField
                                    label="Event Name"
                                    data-e2e="input-name"
                                    name="name"
                                    component={TextInput}
                                />
                            </Col>
                            <Col xs={12} md={6}>
                                <ReduxFormField
                                    multi
                                    label="Type"
                                    data-e2e="input-event-types"
                                    helperText="We'll use this info to suggest some awesome cards to send."
                                    loadOptions={searchEventTypes(client)}
                                    name="eventTypes"
                                    component={Select}
                                />
                            </Col>
                            <Col xs={12} md={6}>
                                <ReduxFormField
                                    hasNoYear
                                    isDateFormat
                                    data-e2e="input-date-start"
                                    label="Month and Day"
                                    name="nextDate.dateStart"
                                    component={DatePicker}
                                />
                                <View>TODO add is_reoccuring checkbox</View>
                            </Col>
                        </Row>
                        <Button data-e2e="submit" type="submit" bsStyle="primary" block>
                            Next
                        </Button>
                    </View>
                </FormSection>
            </Form>
        )
    }
}

export default compose(
    withApollo,
    withRouter,
    reduxForm({
        form: 'CreateAssociatedEventForm',
        destroyOnUnmount: false,
        validate,
    }),
)(CreateEventForm)
