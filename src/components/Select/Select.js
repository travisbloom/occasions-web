// @flow
import ReactSelect from 'react-select';
import React from 'react';

import {View} from '../';

import './Select.scss';

const isReduxForm = props => props.onDragStart && props.onDrop;

const Select = ({
  onBlur,
  remote,
  'data-e2e': e2e,
  ...props
}: {
  'data-e2e'?: string,
  onBlur?: (event: Event) => void,
  remote?: boolean,
}) => {
  const passedProps = {
    ...props,
    onBlur: isReduxForm(props) ? undefined : onBlur,
  };
  return (
    <View data-e2e={e2e}>
      {remote
        ? <ReactSelect.Async {...passedProps} cache={false} />
        : <ReactSelect {...passedProps} />}
    </View>
  );
};

Select.defaultProps = {
  remote: false,
};

export default Select;
