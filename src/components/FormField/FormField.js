import React from 'react'

import { Errors, View } from '../'
import './FormField.scss'

const FormField = ({ name, label, error, touched, helpText, children }) => (
    <View className="form-group">
        {label && <label htmlFor={name}>{label}</label>}
        {children}
        {helpText && <View className="help-block">{helpText}</View>}
        {touched && error && <Errors stackChildren>{error}</Errors>}
    </View>
)

FormField.defaultProps = {
    touched: true,
    label: '',
    helpText: '',
    error: '',
    name: '',
}

FormField.propTypes = {
    label: React.PropTypes.node,
    helpText: React.PropTypes.node,
    error: React.PropTypes.oneOfType([
        React.PropTypes.node,
        React.PropTypes.arrayOf(React.PropTypes.node),
    ]),
    name: React.PropTypes.string,
}

export default FormField
