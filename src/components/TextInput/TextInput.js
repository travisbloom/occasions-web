// @flow
import React from 'react'
import classNames from 'classnames'

class TextInput extends React.Component {
    props: {
        onChange: (value: string, event: SyntheticInputEvent) => void,
        value: number | string,
        className?: string,
        textarea?: boolean,
    }

    static defaultProps = {
        className: '',
        onChange: () => {},
        value: '',
        textarea: false,
    }

    handleOnChange = (event: SyntheticInputEvent) => this.props.onChange(event.target.value, event)

    render() {
        const { className, textarea, ...props } = this.props
        const passedProps = {
            ...props,
            onChange: this.handleOnChange,
            className: classNames('form-control', className),
        }
        if (textarea) return <textarea {...passedProps} />
        return <input {...passedProps} />
    }
}

export default TextInput
