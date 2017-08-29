// @flow
import ReactSelect from 'react-select'
import * as React from 'react'

import { View } from '../'

import './Select.scss'

const isReduxForm = props => props.onDragStart && props.onDrop

const Select = ({
    onBlur,
    loadOptions,
    'data-e2e': e2e,
    ...props
}: {
    'data-e2e'?: string,
    onBlur?: (event: Event) => void,
    loadOptions?: (search: string) => Array<{ label: any, value: any }>,
}) => {
    const passedProps = {
        ...props,
        onBlur: isReduxForm(props) ? undefined : onBlur,
    }
    return (
        <View data-e2e={e2e}>
            {loadOptions ? (
                <ReactSelect.Async {...passedProps} loadOptions={loadOptions} cache={false} />
            ) : (
                <ReactSelect {...passedProps} />
            )}
        </View>
    )
}

Select.defaultProps = {
    remote: false,
}

export default Select
