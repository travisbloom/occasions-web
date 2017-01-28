import React from 'react'
import classNames from 'classnames'

const Input = ({ className, ...props }) => (
    <input {...props} className={classNames('form-control', className)} />
)

export default Input
