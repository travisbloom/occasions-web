// @flow
import React from 'react'
import { reduxForm } from 'redux-form'
import { withRouter } from 'react-router-dom'
import { compose, withApollo } from 'react-apollo'

import {
    ReduxFormField,
    Button,
    View,
    Header,
    Select,
    Col,
    Row,
    LinkContainer,
} from '../../components'
import { searchPeople } from '../../utilities/search'

import urls from '../../urls'
import validate from './validate'

class CreateEventForm extends React.Component {
    render() {
        const { client } = this.props

        return (
            <View marginChildren data-e2e="create-event-form">
                <Row>
                    <Col xs={12} md={5}>
                        <ReduxFormField
                            remote
                            data-e2e="input-receiving-person-id"
                            loadOptions={searchPeople(client)}
                            name="receivingPersonId"
                            component={Select}
                        />
                    </Col>
                    <Col xs={12} md={2} style={{ textAlign: 'center' }}>
                        Or
                    </Col>
                    <Col xs={12} md={5}>
                        <LinkContainer to={urls.createPerson()}>
                            <Button block>Add Contact</Button>
                        </LinkContainer>
                    </Col>
                </Row>
                <Button data-e2e="submit" type="submit" bsStyle="primary" block>Next</Button>
            </View>
        )
    }
}

export default compose(
    reduxForm({
        form: 'CreateAssociatedEventForm',
        destroyOnUnmount: false,
        validate,
    }),
    withApollo,
    withRouter,
)(CreateEventForm)
