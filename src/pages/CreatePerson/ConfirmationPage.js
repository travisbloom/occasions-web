// @flow

import React from 'react'
import { reduxForm, Form, getFormValues } from 'redux-form'
import { connect } from 'react-redux'
import { graphql, compose, withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import moment from 'moment'

import { Alert, View, Panel, Button, FormattedDate, Table } from '../../components'
import { formatGeneralReduxFormErrors } from '../../utilities/errors'
import { formatLocation } from '../../utilities/location'
import urls from '../../urls'

import graphqlQuery from './CreatePersonMutation.graphql'

const LineItem = ({ label, children }) => (
    <tr>
        <td>{label}</td>
        <td>{children}</td>
    </tr>
)

class ConfirmationPage extends React.Component {
    getBirthday = (birthdayDate, birthdayYear) =>
        moment(birthdayDate).year(birthdayYear.value).format('YYYY-MM-DD')

    handleSubmit = ({ locations, birthdayDate, birthdayYear, ...values }) => {
        const { createPerson, history } = this.props
        const input = {
            ...values,
            birthDate: this.getBirthday(birthdayDate, birthdayYear),
            locations: locations.map(({ state, ...location }) => ({
                ...location,
                state: state.value,
            })),
        }
        return createPerson(input)
            .then(({ data: { createPerson: { associatedEvent } } }) =>
                history.push(urls.associatedEventDetails(associatedEvent.id)),
            )
            .catch(formatGeneralReduxFormErrors)
    }

    render() {
        const { handleSubmit, error, formValues, onAddAddress } = this.props

        return (
            <Form onSubmit={handleSubmit(this.handleSubmit)}>
                <View marginChildren data-e2e="confirmation-page">
                    <Panel header={`${formValues.firstName} ${formValues.lastName}`}>
                        <Table striped bordered>
                            <tbody>
                                <LineItem label="Email">
                                    {formValues.email}
                                </LineItem>
                                <LineItem label="Birthday">
                                    <FormattedDate
                                        date={this.getBirthday(
                                            formValues.birthdayDate,
                                            formValues.birthdayYear,
                                        )}
                                    />
                                </LineItem>
                                {formValues.locations.map((location, index) => (
                                    <LineItem key={index} label={`Address #${index + 1}`}>
                                        {formatLocation(location)}
                                    </LineItem>
                                ))}
                            </tbody>
                        </Table>
                    </Panel>
                    <Button data-e2e="submit" type="submit" block>Create Person</Button>
                    <Button data-e2e="add-location" onClick={onAddAddress} block>
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

const formValuesSelector = getFormValues('CreatePersonForm')
export default compose(
    connect(state => ({
        formValues: formValuesSelector(state),
    })),
    graphql(graphqlQuery, {
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
