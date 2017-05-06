// @flow

import React from 'react'
import { reduxForm, SubmissionError } from 'redux-form'

import { graphql, compose, withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import {
    ReduxFormField,
    TextInput,
    Button,
    Row,
    Errors,
    View,
    OverlayTrigger,
    Tooltip,
} from '../../components'
import { formatReduxFormErrors } from '../../utilities/errors'
import { signIn } from '../../utilities/auth'
import urls from '../../urls'

import graphqlQuery from './CreateUserMutation.graphql'

class CreateAccountForm extends React.Component {
    componentDidMount() {
        const { client } = this.props
        client.networkInterface.setUri(`${APP_ENV.appServer}/graphql_public`)
    }

    onSuccess = () => {
        const { client, history } = this.props
        client.networkInterface.setUri(`${APP_ENV.appServer}/graphql`)
        history.push(urls.associatedEventsList())
    }

    createAccount = (values) => {
        const { createUser } = this.props
        return createUser(values).catch(formatReduxFormErrors).then(() => this.signIn(values))
    }

    signIn = ({ username, password }) =>
        signIn(username, password).then(this.onSuccess).catch(() => {
            throw new SubmissionError({
                _error: 'Invalid username and password.',
            })
        })

    render() {
        const { handleSubmit, submitting, pristine, error } = this.props

        return (
            <form onSubmit={handleSubmit(this.signIn)}>
                <View marginChildren>
                    <ReduxFormField
                        label={
                            <OverlayTrigger
                                overlay={
                                    <Tooltip id="we-hate-spam-email">
                                        {'We hate spam email as much as you do.'}
                                        {' Occasions sends delightfully infrequent'}
                                        {' emails only when you have an upcoming occasion.'}
                                    </Tooltip>
                                }
                            >
                                <View inline>Email</View>
                            </OverlayTrigger>
                        }
                        type="email"
                        autoComplete="email"
                        name="username"
                        component={TextInput}
                    />
                    <ReduxFormField
                        autoComplete="password"
                        label="Password"
                        type="password"
                        name="password"
                        component={TextInput}
                    />
                    <Errors>{error}</Errors>
                    <Row center="xs">
                        <Button
                            style={{ width: '160px' }}
                            disabled={submitting || pristine}
                            type="submit"
                        >
                            Sign In
                        </Button>
                        <View margin>
                            Or
                        </View>
                        <Button
                            disabled={submitting || pristine}
                            onClick={handleSubmit(this.createAccount)}
                        >
                            Create Account
                        </Button>
                    </Row>
                </View>
            </form>
        )
    }
}

export default compose(
    graphql(graphqlQuery, {
        props: ({ mutate }) => ({
            createUser: values => mutate({ variables: { input: values } }),
        }),
    }),
    reduxForm({
        form: 'CreateAccountForm',
        initialValues: { username: '', password: '' },
    }),
    withRouter,
    withApollo,
)(CreateAccountForm)
