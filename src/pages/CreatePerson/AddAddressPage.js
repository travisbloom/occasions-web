// @flow

import React from 'react'
import { reduxForm, FormSection, getFormValues } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'

import { View, Header, AddressForm, Button } from '../../components'

import validate from './validate'

class AddAddressPage extends React.Component {
    render() {
        const { handleSubmit, submitting, pristine, addressIndex, formValues } = this.props
        return (
            <form onSubmit={handleSubmit}>
                <View marginChildren data-e2e="add-address-page">
                    <Header size="largest">
                        Add
                        {' '}
                        {addressIndex ? 'Another' : 'An'}
                        {' '}
                        Address For
                        {' '}
                        {formValues.firstName}
                        {' '}
                        {formValues.lastName}
                    </Header>
                    <FormSection name={`associatedLocations[${addressIndex}]`}>
                        <AddressForm />
                    </FormSection>
                    <Button
                        data-e2e="submit"
                        disabled={submitting || pristine}
                        bsStyle="info"
                        type="submit"
                    >
                        Add A New Address
                    </Button>
                </View>
            </form>
        )
    }
}

const formValuesSelector = getFormValues('CreatePersonForm')
export default compose(
    connect(state => ({
        formValues: formValuesSelector(state),
    })),
    reduxForm({
        validate,
        destroyOnUnmount: false,
        form: 'CreatePersonForm',
    }),
)(AddAddressPage)
