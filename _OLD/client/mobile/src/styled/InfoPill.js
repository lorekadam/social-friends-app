import React from 'react';
import { Badge, Text } from 'native-base';
import styled from 'styled-components';

import * as color from './baseColors';

const Pill = styled(Badge)`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  width: 100%;
  background-color: ${props => color[props.type]};
`;

export const InfoPill = props => (
  <Pill type={props.type}>
    <Text>{props.message}</Text>
  </Pill>
);
