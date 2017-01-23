import React from 'react'
import { reduxForm } from 'redux-form'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { FormField, Input, Button, Row, Col, Errors } from '../../components'
import { formatReduxFormErrors } from '../../utilities/errors'

class CreateAccount extends React.Component {

    handleSubmit = (values) => {
        const { createUser } = this.props
        return createUser(values).catch(formatReduxFormErrors)
    }

    render() {
        const { handleSubmit, submitting, pristine, error } = this.props
        return (
            <div>
                <form onSubmit={handleSubmit(this.handleSubmit)}>
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
                        <Col sm={6} smOffset={3}>
                            <Button disabled={submitting || pristine} type="submit">
                                {submitting ? 'Submitting' : 'Create Acount'}
                            </Button>
                        </Col>
                    </Row>
                </form>
            </div>
        )
    }
}


const formComponent = reduxForm({
    form: 'createAccount',
    destroyOnUnmount: false,
    initialValues: { username: '', password: '' },
})(CreateAccount)

export default graphql(gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
        user {
            username
            password
        }
    }
  }
`, {
    props: ({ mutate }) => ({
        createUser: values => mutate({ variables: { input: values } }),
    }),
})(formComponent)
