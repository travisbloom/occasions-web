import { Field } from 'redux-form'
import React from 'react'

import { FormField } from '../'

const componentRenderer = ({ meta: { error, touched }, input, RenderedComponent, name, label, helpText, ...props }) => (
    <FormField error={error} touched={touched} name={name} label={label} helpText={helpText}>
        <RenderedComponent name={name} {...input} {...props} />
    </FormField>
)

const ReduxFormField = ({ component, ...props }) => (
    <Field
        {...props}
        RenderedComponent={component}
        component={componentRenderer}
    />
)

ReduxFormField.propTypes = {
    component: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
}

export default ReduxFormField
