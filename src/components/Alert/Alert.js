import { Alert as RBAlert } from 'react-bootstrap'
import React from 'react'

const Alert = ({ style, ...props }) => (
    <RBAlert {...props} style={{ marginBottom: 0, ...style }} />
)

Alert.propTypes = RBAlert.propTypes

export default Alert
