import React from 'react';
import { Badge, Text } from 'native-base';
import styled from 'styled-components';

import { error } from './baseColors';

const Styled = styled(Badge)`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  width: 100%;
  background-color: ${error};
`;

const ErrorBlock = props => (
  <Styled>
    <Text>{props.message}</Text>
  </Styled>
);

export default ErrorBlock;
