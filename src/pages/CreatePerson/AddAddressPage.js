// @flow

import React from 'react'
import { reduxForm, FormSection } from 'redux-form'

import { View, AddressForm, Button } from '../../components'

import validate from './validate'

class AddAddressPage extends React.Component {

    render() {
        const { handleSubmit, submitting, pristine, addressIndex } = this.props
        return (
            <form onSubmit={handleSubmit}>
                <View padding>
                    <FormSection name={`associatedLocations[${addressIndex}]`}>
                        <AddressForm />
                    </FormSection>
                    <Button
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

export default reduxForm({
    validate,
    destroyOnUnmount: false,
    form: 'CreatePersonForm',
})(AddAddressPage)
