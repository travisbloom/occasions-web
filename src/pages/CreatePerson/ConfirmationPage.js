// @flow

import React from 'react'
import { reduxForm, Form, getFormValues } from 'redux-form'
import { connect } from 'react-redux'
import { graphql, compose, withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import gql from 'graphql-tag'

import { Alert, View, Panel, Button, Row, Col, FormattedDate } from '../../components'
import { formatGeneralReduxFormErrors } from '../../utilities/errors'
import { formatLocation } from '../../utilities/location'
import urls from '../../urls'

const LineItem = ({ label, children }) => (
    <Row>
        <Col xs={6}>{label}</Col>
        <Col xs={6}>{children}</Col>
    </Row>
)

class ConfirmationPage extends React.Component {
    handleSubmit = ({ associatedLocations, birthdayDate, birthdayYear, ...values }) => {
        const { createPerson, history } = this.props
        const input = {
            ...values,
            birthday: moment(birthdayDate).year(birthdayYear),
            associatedLocations: associatedLocations.map(({ state, ...location }) => ({
                ...location,
                state: state.value,
            })),
        }
        return createPerson(input)
            .then(({ data: { createPerson: { associatedEvent } } }) =>
                history.push(urls.associatedEventDetails(associatedEvent.id)))
            .catch(formatGeneralReduxFormErrors)
    };

    render() {
        const { handleSubmit, error, formValues, onAddAddress } = this.props

        return (
            <Form onSubmit={handleSubmit(this.handleSubmit)}>
                <View marginChildren>
                    <Panel header={`${formValues.firstName} ${formValues.lastName}`}>
                        <LineItem label="Birthday">
                            <FormattedDate date={formValues.birthday} />
                        </LineItem>
                        <Panel header="Addresses">
                            {formValues.associatedLocations.map(location => (
                                <View>
                                    {formatLocation(location)}
                                </View>
                            ))}
                        </Panel>,
                    </Panel>
                    <Button type="submit" block>Create Person</Button>
                    <Button onClick={onAddAddress} block>
                        Add Another Address
                    </Button>
                    <Alert dismissable unHideWithChildren stackChildren bsStyle="danger">
                        {error}
                    </Alert>
                </View>
            </Form>
        )
    }
}

const createTransactionQuery = gql`
mutation CreateAssociatedEvent($input: CreateAssociatedEventInput!) {
  createPerson(input: $input) {
    associatedEvent {
      id
      creatingPerson {
        fullName
      }
      receivingPerson {
        fullName
      }
      event {
        name

      }
    }
  }
}
`
const formValuesSelector = getFormValues('CreatePersonForm')
export default compose(
    connect(state => ({
        formValues: formValuesSelector(state),
    })),
    graphql(createTransactionQuery, {
        props: ({ mutate }) => ({
            createPerson: values => mutate({ variables: { input: values } }),
        }),
    }),
    reduxForm({
        destroyOnUnmount: false,
        form: 'CreatePersonForm',
    }),
    withRouter,
    withApollo,
)(ConfirmationPage)
