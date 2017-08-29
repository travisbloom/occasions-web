// @flow

import * as React from 'react'
import { reduxForm, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
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
    Col,
} from '../../components'
import { formatReduxFormErrors } from '../../utilities/errors'
import { signIn } from '../../utilities/auth'
import urls from '../../urls'
import { logOut } from '../../actions/user'

import graphqlQuery from './CreateUserMutation.graphql'

class CreateAccountForm extends React.Component<$FlowFixMeProps> {
    componentDidMount() {
        const { client, dispatch } = this.props
        dispatch(logOut())
        client.networkInterface.setUri(`${APP_ENV.appServer}/graphql_public`)
    }

    onSuccess = () => {
        const { client, history } = this.props
        client.networkInterface.setUri(`${APP_ENV.appServer}/graphql`)
        history.push(urls.associatedEventsList())
    }

    createAccount = values => {
        const { createUser } = this.props
        return createUser(values)
            .catch(formatReduxFormErrors)
            .then(() => this.signIn(values))
    }

    signIn = ({ username, password }) =>
        signIn(username, password)
            .then(this.onSuccess)
            .catch(() => {
                throw new SubmissionError({
                    _error: 'Invalid username and password.',
                })
            })

    render() {
        const { handleSubmit, submitting, pristine, error } = this.props

        return (
            <form onSubmit={handleSubmit(this.signIn)}>
                <View marginChildren>
                    <View>
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
                            data-e2e="input-email"
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
                            data-e2e="input-password"
                            component={TextInput}
                        />
                    </View>
                    <Errors>{error}</Errors>
                    <Row center="xs" middle="xs">
                        <Col sm={5} xs={12}>
                            <Button
                                block
                                data-e2e="submit"
                                disabled={submitting || pristine}
                                type="submit"
                            >
                                Sign In
                            </Button>
                        </Col>
                        <Col sm={2} xs={12}>
                            <View margin>Or</View>
                        </Col>
                        <Col sm={5} xs={12}>
                            <Button
                                block
                                disabled={submitting || pristine}
                                onClick={handleSubmit(this.createAccount)}
                            >
                                Create Account
                            </Button>
                        </Col>
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
    connect(),
    withRouter,
    withApollo
)(CreateAccountForm)
