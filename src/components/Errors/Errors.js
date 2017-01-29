import React from 'react'

import { View } from '../'

const formatStackedChildren = children => React.Children.map(children, node => (
    <View>{node}</View>
))

const Errors = ({ children, stackChildren }) => (
    <View style={{ color: 'red' }}>{stackChildren ? formatStackedChildren(children) : children}</View>
)

Errors.propTypes = {
    stackChildren: React.PropTypes.bool,
}

Errors.defaultProps = {
    stackChildren: false,
}

export default Errors
