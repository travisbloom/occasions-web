import { Field } from 'redux-form'
import React from 'react'

import { Errors } from '../'

const componentRenderer = ({
    name,
    label,
    renderedComponent,
    helpText,
    meta: { error, touched },
    input,
    ...props
}) => (
    <div className="form-group">
        {label && <label htmlFor={name}>{label}</label>}
        {renderedComponent({ ...input, ...props, name })}
        {helpText && <div className="help-block">{helpText}</div>}
        {touched && error && <Errors stackChildren>{error}</Errors>}
    </div>
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
