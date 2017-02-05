import ReactSelect from 'react-select'
import React from 'react'

import './Select.scss'

const isReduxForm = props => props.onDragStart && props.onDrop

const Select = ({ onBlur, ...props }) => (
    <ReactSelect
        {...props}
        onBlur={isReduxForm(props) ? undefined : onBlur}
    />
)

export default Select
