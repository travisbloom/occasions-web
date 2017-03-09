import { Alert as RBAlert } from 'react-bootstrap'
import React from 'react'

import { View } from '../'

const formatStackedChildren = children => React.Children.map(children, node => <View>{node}</View>)

class Alert extends React.Component {
    static propTypes = {
        ...RBAlert.propTypes,
        stackChildren: React.PropTypes.bool,
        unHideWithChildren: React.PropTypes.bool,
        dismissable: React.PropTypes.bool,
    };

    static defaultProps = {
        stackChildren: false,
        unHideWithChildren: false,
        dismissable: false,
    };

    constructor(props) {
        super(props)
        const { unHideWithChildren, dismissable, children } = props
        this.state = {
            isShowing: dismissable ? unHideWithChildren && children : true,
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (
            nextProps.children !== this.props.children &&
            nextProps.children &&
            nextProps.unHideWithChildren &&
            !nextState.isShowing
        ) {
            this.setState({ isShowing: true })
        }
    }

    onDismiss = () => this.setState({ isShowing: false });

    render() {
        const { isShowing } = this.state
        const { style, children, stackChildren, onDismiss, dismissable, ...props } = this.props

        delete props.unHideWithChildren

        if (!isShowing) return null // TODO animate this

        return (
            <RBAlert
                {...props}
                style={{ marginBottom: 0, ...style }}
                onDismiss={onDismiss || dismissable ? this.onDismiss : undefined}
            >
                {stackChildren ? formatStackedChildren(children) : children}
            </RBAlert>
        )
    }
}

export default Alert
