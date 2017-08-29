// @flow
import {Alert as RBAlert} from 'react-bootstrap';
import React from 'react';
import {omit} from 'lodash';

import {View} from '../';

const formatStackedChildren = children =>
  React.Children.map(children, node => <View>{node}</View>);

type Props = {
  stackChildren?: boolean,
  unHideWithChildren?: boolean,
  dismissable?: boolean,
  children?: any,
  style?: any,
  onDismiss?: Event => void, // TODO figure out why this is erroring
};
type State = {
  isShowing: boolean,
};
class Alert extends React.Component {
  props: Props;
  state: State;
  static defaultProps = {
    children: null,
    style: {},
    stackChildren: false,
    unHideWithChildren: false,
    dismissable: false,
  };

  constructor(props: Props) {
    super(props);
    const {unHideWithChildren, dismissable, children} = props;
    this.state = {
      isShowing: dismissable ? !!(unHideWithChildren && children) : true,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (
      nextProps.children !== this.props.children &&
      nextProps.children &&
      nextProps.unHideWithChildren &&
      !this.state.isShowing
    ) {
      this.setState({isShowing: true});
    }
  }

  onDismiss = (event: Event) => {
    const {onDismiss, dismissable} = this.props;
    if (onDismiss) {
      onDismiss(event);
    } else if (dismissable) {
      this.setState({isShowing: false});
    }
  };

  render() {
    const {isShowing} = this.state;
    const {style, children, stackChildren, ...props} = this.props;

    if (!isShowing) return null; // TODO animate this

    return (
      <RBAlert
        {...omit(props, [
          'unHideWithChildren',
          'onDismiss',
          'dismissable',
          'canBeHidden',
        ])}
        style={{marginBottom: '0', ...style}}
        onDismiss={this.onDismiss}
      >
        {stackChildren ? formatStackedChildren(children) : children}
      </RBAlert>
    );
  }
}

export default Alert;
