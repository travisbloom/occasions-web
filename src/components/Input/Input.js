import React from 'react'
import classNames from 'classnames'

const Input = ({ className, textarea, ...props }) => {
    const passedProps = {
        ...props,
        className: classNames('form-control', className),
    }
    if (textarea) return <textarea {...passedProps} />
    return <input {...passedProps} />
}

export default Input
