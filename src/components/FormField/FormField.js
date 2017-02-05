import { Field } from 'redux-form'
import React from 'react'

import { Errors, View } from '../'

const BaseField = ({ ...props, name, label, error, touched, helpText, RenderedComponent }) => (
    <View className="form-group">
        {label && <label htmlFor={name}>{label}</label>}
        <RenderedComponent name={name} {...props} />
        {helpText && <View className="help-block">{helpText}</View>}
        {touched && error && <Errors stackChildren>{error}</Errors>}
    </View>
)

BaseField.defaultProps = {
    touched: true,
}

const componentRenderer = ({ meta: { error, touched }, input, ...props }) => (
    <BaseField {...input} {...props} error={error} touched={touched} />
)

const FormField = ({ component, isNotReduxForm, ...props }) => {
    if (isNotReduxForm) {
        return <BaseField RenderedComponent={component} {...props} />
    }
    return (
        <Field
            {...props}
            RenderedComponent={component}
            component={componentRenderer}
        />
    )
}

FormField.propTypes = {
    isNotReduxForm: React.PropTypes.bool,
    label: React.PropTypes.node,
    component: React.PropTypes.func.isRequired,
    helpText: React.PropTypes.node,
    name: React.PropTypes.string.isRequired,
}

export default FormField
