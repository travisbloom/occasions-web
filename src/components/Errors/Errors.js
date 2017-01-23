import React from 'react'

const formatStackedChildren = children => React.Children.map(children, node => (
    <div>{node}</div>
))

const Errors = ({ children, stackChildren }) => (
    <div style={{ color: 'red' }}>{stackChildren ? formatStackedChildren(children) : children}</div>
)

Errors.propTypes = {
    stackChildren: React.PropTypes.bool,
}

Errors.defaultProps = {
    stackChildren: false,
}

export default Errors
