// @flow

import React from 'react'
import { reduxForm, FormSection } from 'redux-form'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router'
import gql from 'graphql-tag'

import { Button, Row, Alert, View, AddressForm, Modal } from '../../components'
import { formatReduxFormErrors } from '../../utilities/errors'

class NewAddressForm extends React.Component {

    createNewAssociatedLocation = (values) => {
        const { createNewAssociatedLocation, onHide } = this.props
        return (
            createNewAssociatedLocation(values)
                .then(onHide)
                .catch(formatReduxFormErrors)
        )
    }

    render() {
        const { handleSubmit, submitting, pristine, error, person, show, onHide } = this.props

        return (
            <Modal show={show} onHide={onHide}>
                <form onSubmit={handleSubmit(this.createNewAssociatedLocation)}>
                    <Modal.Header>
                    Create New Address For {person.fullName}
                    </Modal.Header>
                    <Modal.Body>
                        <View padding>
                            <FormSection name="location">
                                <AddressForm />
                            </FormSection>
                            <Alert
                                dismissable
                                unHideWithChildren
                                stackChildren
                                bsStyle="danger"
                            >
                                {error}
                            </Alert>
                        </View>
                    </Modal.Body>
                    <Modal.Footer>
                        <Row center="xs">
                            <Button
                                bsStyle="success"
                                disabled={submitting || pristine}
                                type="submit"
                            >
                                Create
                            </Button>
                        </Row>
                    </Modal.Footer>
                </form>

            </Modal>
        )
    }
}

const query = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
        personLocation {
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
            createNewAssociatedLocation: values => mutate({ variables: { input: values } }),
        }),
    }),
    reduxForm({
        form: 'NewAddressForm',
    }),
    withRouter,
)(NewAddressForm)
