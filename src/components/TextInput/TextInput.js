import React from 'react'
import classNames from 'classnames'

class TextInput extends React.Component {

    static propTypes = {
        onChange: React.PropTypes.func.isRequired,
        value: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string,
        ]).isRequired,
    }

    handleOnChange = event => this.props.onChange(event.target.value, event)

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
