// @flow
import * as React from 'react'
import { Button as BootstrapButton } from 'react-bootstrap'
import { Row, Col } from '../'

const Button = ({
    bsStyle,
    responsive,
    type,
    block,
    ...props
}: {
    block?: boolean,
    responsive?: boolean,
    bsStyle?: 'primary',
    type?: 'submit' | 'button',
}) => {
    const button = (
        <BootstrapButton
            {...props}
            block={block || responsive}
            type={type}
            bsStyle={bsStyle || (type === 'submit' ? 'success' : undefined)}
        />
    )
    if (!responsive) return button
    return (
        <Row center="xs" start="md">
            <Col xs={10} sm={4}>
                {button}
            </Col>
        </Row>
    )
}

export default Button
