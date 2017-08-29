// @flow

import * as React from 'react';
import { reduxForm, FormSection } from 'redux-form'
import { graphql, compose } from 'react-apollo'

import { Button, Alert, AddressForm, Modal } from '../../components'
import { formatReduxFormErrors } from '../../utilities/errors'

import graphqlQuery from './CreateAssociatedLocationMutation.graphql'

class NewAddressForm extends React.Component<$FlowFixMeProps, $FlowFixMeState> {
    createNewAssociatedLocation = values => {
        const { createNewAssociatedLocation, onComplete } = this.props
        const formattedPayload = {
            ...values,
            location: {
                ...values.location,
                state: values.location.state ? values.location.state.value : '',
            },
        }
        return createNewAssociatedLocation(formattedPayload)
            .then(onComplete)
            .catch(formatReduxFormErrors)
    }

    render() {
        const { handleSubmit, submitting, pristine, error, person, show, onHide } = this.props

        return (
            <Modal show={show} onHide={onHide}>
                <form onSubmit={handleSubmit(this.createNewAssociatedLocation)}>
                    <Modal.Header closeButton>
                        Create New Address For {person.fullName}
                    </Modal.Header>
                    <Modal.Body>
                        <FormSection name="location">
                            <AddressForm />
                        </FormSection>
                        <Alert dismissable unHideWithChildren stackChildren bsStyle="danger">
                            {error}
                        </Alert>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            responsive
                            bsStyle="success"
                            disabled={submitting || pristine}
                            type="submit"
                        >
                            Create
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        )
    }
}

export default compose(
    graphql(graphqlQuery, {
        props: ({ mutate }) => ({
            createNewAssociatedLocation: values => mutate({ variables: { input: values } }),
        }),
    }),
    reduxForm({
        form: 'NewAddressForm',
    })
)(NewAddressForm)
