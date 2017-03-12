// @flow

import React from 'react'
import { reduxForm, SubmissionError } from 'redux-form'

import { graphql, compose, withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'

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

class CreateAccountForm extends React.Component {
    onSuccess = () => {
        const { client, history } = this.props
        client.networkInterface.setUri(`${APP_ENV.appServer}/graphql`)
        history.push(urls.associatedEventsList())
    };

    createAccount = (values) => {
        const { createUser } = this.props
        // TODO add access token to local storage
        return createUser(values).then(this.onSuccess).catch(formatReduxFormErrors)
    };

    signIn = ({ username, password }) =>
        signIn(username, password).then(this.onSuccess).catch(() => {
            throw new SubmissionError({
                _error: 'Invalid username and password.',
            })
        });

    render() {
        const { handleSubmit, submitting, pristine, error } = this.props

        return (
            <View>
                <form onSubmit={handleSubmit(this.signIn)}>
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
                            Create An Account
                        </Button>
                    </Row>
                </form>
            </View>
        )
    }
}

const query = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
        user {
            username,
            accessTokens {
              edges {
                node {
                  id
                }
              }
          }
        }
    }
  }
`

export default compose(
    graphql(query, {
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
