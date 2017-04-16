// @flow
import React from 'react'

class Header extends React.Component {
    props: {
        size?: bsSize,
        children?: any,
    }

    render() {
        const { size, children, ...props } = this.props
        const el = {
            largest: 'h1',
            larger: 'h2',
            large: 'h3',
            medium: 'h4',
            small: 'h5',
            smaller: 'h6',
        }

        return React.createElement(el[size || 'medium'], props, children)
    }
}

export default Header
