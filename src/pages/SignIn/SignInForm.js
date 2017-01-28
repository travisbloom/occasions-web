// @flow

import React from 'react'
import { reduxForm } from 'redux-form'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router'
import gql from 'graphql-tag'

import { FormField, Input, Button, Row, Col, Errors } from '../../components'
import { formatReduxFormErrors } from '../../utilities/errors'
import { signIn } from '../../requests/auth'
import urls from '../../urls'

class CreateAccountForm extends React.Component {

    onSuccess = () => this.props.router.push(urls.home())

    createAccount = (values) => {
        const { createUser } = this.props
        return (
            createUser(values)
                .then(this.onSuccess)
                .catch(formatReduxFormErrors)
        )
    }

    signIn = ({ username, password }) => (
        signIn(username, password).then(this.onSuccess).catch(formatReduxFormErrors)
    )

    render() {
        const { handleSubmit, submitting, pristine, error } = this.props

        return (
            <div>
                <form onSubmit={handleSubmit(this.signIn)}>
                    <FormField
                        label="Email"
                        type="email"
                        name="username"
                        component={Input}
                        helpText={
                                'We hate spam email as much as you do. Occasions sends delightfully infrequent emails only when you have an upcoming occasion.'
                            }
                    />
                    <FormField
                        label="Password"
                        type="password"
                        name="password"
                        component={Input}
                    />
                    <Errors>{error}</Errors>
                    <Row>
                        <Col xs={5} style={{ textAlign: 'right' }}>
                            <Button disabled={submitting || pristine} type="submit">
                                Sign In
                            </Button>
                        </Col>
                        <Col xs={2} style={{ textAlign: 'center' }}>
                            Or
                        </Col>
                        <Col xs={5}>
                            <Button
                                disabled={submitting || pristine}
                                onClick={handleSubmit(this.createAccount)}
                            >
                                Create An Account
                            </Button>
                        </Col>
                    </Row>
                </form>
            </div>
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
)(CreateAccountForm)
