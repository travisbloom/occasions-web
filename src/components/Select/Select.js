import ReactSelect from 'react-select'
import React from 'react'

import './Select.scss'

const isReduxForm = props => props.onDragStart && props.onDrop

const Select = ({ onBlur, remote, ...props }) => {
    const passedProps = {
        ...props,
        onBlur: isReduxForm(props) ? undefined : onBlur,
    }
    return remote
        ? <ReactSelect.Async {...passedProps} cache={false} />
        : <ReactSelect {...passedProps} />
}

Select.propTypes = {
    ...ReactSelect.propTypes,
    remote: React.PropTypes.bool,
}

Select.defaultProps = {
    remote: false,
}

export default Select
