// @flow
import { Alert as RBAlert } from 'react-bootstrap'
import React from 'react'

import { View } from '../'

const formatStackedChildren = children => React.Children.map(children, node => <View>{node}</View>)

type Props = {
    stackChildren?: boolean,
    unHideWithChildren?: boolean,
    dismissable?: boolean,
    children?: any,
    style?: any,
    onDismiss?: ((Event) => void) | any, // TODO figure out why this is erroring
}
type State = {
    isShowing: boolean,
}
class Alert extends React.Component {
    props: Props
    state: State
    static defaultProps = {
        children: null,
        style: CSSStyleDeclaration,
        stackChildren: false,
        unHideWithChildren: false,
        dismissable: false,
        onDismiss: null,
    }

    constructor(props: Props) {
        super(props)
        const { unHideWithChildren, dismissable, children } = props
        this.state = {
            isShowing: dismissable ? !!(unHideWithChildren && children) : true,
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (
            nextProps.children !== this.props.children &&
            nextProps.children &&
            nextProps.unHideWithChildren &&
            !this.state.isShowing
        ) {
            this.setState({ isShowing: true })
        }
    }

    onDismiss = (event: Event) => {
        const { onDismiss, dismissable } = this.props
        if (onDismiss) {
            onDismiss(event)
        } else if (dismissable) {
            this.setState({ isShowing: false })
        }
    }

    render() {
        const { isShowing } = this.state
        const { style, children, stackChildren, ...props } = this.props

        delete props.unHideWithChildren
        delete props.onDismiss
        delete props.dismissable

        if (!isShowing) return null // TODO animate this

        return (
            <RBAlert {...props} style={{ marginBottom: '0', ...style }} onDismiss={this.onDismiss}>
                {stackChildren ? formatStackedChildren(children) : children}
            </RBAlert>
        )
    }
}

export default Alert
