// @flow

import React from 'react'
import { reduxForm } from 'redux-form'

import { View, Link, ReduxFormField, TextInput, Button, DatePicker } from '../../components'
import urls from '../../urls'

import validate from './validate'

class PersonInfoPage extends React.Component {
    render() {
        const { handleSubmit, submitting, pristine } = this.props
        return (
            <form onSubmit={handleSubmit}>
                <View padding>
                    <ReduxFormField label="First Name" name="firstName" component={TextInput} />
                    <ReduxFormField label="Last Name" name="lastName" component={TextInput} />
                    <ReduxFormField label="Email" type="email" name="email" component={TextInput} />
                    <ReduxFormField
                        label="When's their birthday?"
                        name="birthday"
                        hasNoYear
                        component={DatePicker}
                    />
                    <Button disabled={submitting || pristine} bsStyle="info" type="submit">
                        Add Contact
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
})(PersonInfoPage)
