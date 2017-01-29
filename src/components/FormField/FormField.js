import { Field } from 'redux-form'
import React from 'react'

import { Errors, View } from '../'

const componentRenderer = ({
    name,
    label,
    renderedComponent,
    helpText,
    meta: { error, touched },
    input,
    ...props
}) => (
    <View className="form-group">
        {label && <label htmlFor={name}>{label}</label>}
        {renderedComponent({ ...input, ...props, name })}
        {helpText && <View className="help-block">{helpText}</View>}
        {touched && error && <Errors stackChildren>{error}</Errors>}
    </View>
)

const FormField = ({ name, component, ...props }) => (
    <Field
        {...props}
        name={name}
        renderedComponent={component}
        component={componentRenderer}
    />
)

FormField.propTypes = {
    label: React.PropTypes.node,
    component: React.PropTypes.func.isRequired,
    helpText: React.PropTypes.node,
    name: React.PropTypes.string.isRequired,
}

export default FormField
