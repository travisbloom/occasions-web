// @flow

import React from 'react'
import { reduxForm } from 'redux-form'
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

class CreateAssociatedEventFormPage1 extends React.Component {
    render() {
        const { client, handleSubmit } = this.props

        return (
            <form onSubmit={handleSubmit}>
                <View marginChildren>
                    <Header>{'Who Is This Event For?'}</Header>
                    <Row>
                        <Col xs={12} md={5}>
                            <ReduxFormField
                                remote
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

                    <Button type="submit" block>Next</Button>
                </View>
            </form>
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
)(CreateAssociatedEventFormPage1)
