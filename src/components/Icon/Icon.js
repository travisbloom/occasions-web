// @flow
import React from 'react';
import {Glyphicon} from 'react-bootstrap';

const Icon = ({type, ...props}: {type: string}) => (
  <Glyphicon glyph={type} {...props} />
);

export default Icon;
