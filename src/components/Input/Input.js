import React from 'react'
import classNames from 'classnames'

const Input = props => (
    <input {...props} className={classNames('form-control', props.className)} />
)

export default Input
