import React from 'react'

class Header extends React.Component {
    static propTypes = {
        size: React.PropTypes.oneOf(['smaller', 'small', 'medium', 'large', 'larger', 'largest']),
    };

    static defaultProps = {
        size: 'medium',
    };

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

        return React.createElement(el[size], props, children)
    }
}

export default Header
