// @flow
import React from 'react'

import { View } from '../'

const formatStackedChildren = children => React.Children.map(children, node => <View>{node}</View>)

const Errors = ({ children, stackChildren }: { children?: any, stackChildren?: boolean }) => (
    <View style={{ color: 'red' }}>
        {stackChildren ? formatStackedChildren(children) : children}
    </View>
)

Errors.defaultProps = {
    stackChildren: false,
}

export default Errors
