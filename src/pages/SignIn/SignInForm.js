// @flow

import React from 'react'
import { reduxForm } from 'redux-form'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { FormField, Input, Button, Row, Col, Errors } from '../../components'
import { formatReduxFormErrors } from '../../utilities/errors'
import { signIn } from '../../requests/auth'

class CreateAccountForm extends React.Component {

    createAccount = (values) => {
        const { createUser } = this.props
        return (
            createUser(values)
                .then(response => console.log(response))
                .catch(formatReduxFormErrors)
        )
    }

    signIn = ({ username, password }) => (
        signIn(username, password)
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


const formComponent = reduxForm({
    form: 'CreateAccountForm',
    initialValues: { username: '', password: '' },
})(CreateAccountForm)

export default graphql(
    gql`
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
    `,
    {
        props: ({ mutate }) => ({
            createUser: values => mutate({ variables: { input: values } }),
        }),
    },
)(formComponent)
