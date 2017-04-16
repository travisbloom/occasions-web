// @flow
import React from 'react'
import { Button as BootstrapButton } from 'react-bootstrap'

const Button = ({ bsStyle, type, ...props }: { bsStyle?: bsStyle, type?: 'submit' | 'button' }) => (
    <BootstrapButton
        {...props}
        type={type}
        bsStyle={bsStyle || (type === 'submit' ? 'success' : undefined)}
    />
)

export default Button
