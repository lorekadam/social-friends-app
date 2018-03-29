import React from 'react';
import { Badge, Text } from 'native-base';

const ErrorBlock = props => (
  <Badge danger>
    <Text>{props.message}</Text>
  </Badge>
);

export default ErrorBlock;
