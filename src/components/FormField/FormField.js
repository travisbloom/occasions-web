// @flow
import React from 'react'

import { Errors, View } from '../'
import './FormField.scss'

const FormField = ({
    name,
    label,
    error,
    touched,
    helpText,
    children,
}: {
    name?: string,
    label?: string,
    error?: string | Array<any>,
    touched?: boolean,
    helpText?: string,
    children?: any,
}) => (
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

export default FormField
