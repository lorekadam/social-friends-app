import React from 'react';
import { Badge, Text } from 'native-base';

const styles = {
  marginTop: 10,
  marginBottom: 10,
  display: 'flex',
  width: '100%'
};

const ErrorBlock = props => (
  <Badge danger style={styles}>
    <Text>{props.message}</Text>
  </Badge>
);

export default ErrorBlock;
