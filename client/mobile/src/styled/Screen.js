import styled from 'styled-components';

import { Content } from 'native-base';
import { gray } from './baseColors';

export const Screen = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  background-color: ${gray};
  padding-top: 30px;
  ${props => props.row && 'flex-direction:row;'};
  ${props => props.column && 'flex-direction:column;'};
  ${props => props.aic && 'align-items:center;'};
  ${props => props.jcc && 'justify-content:center;'};
`;

export const ScrollScreen = styled.ScrollView`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  background-color: ${gray};
  padding-top: 30px;
  ${props => props.row && 'flex-direction:row;'};
  ${props => props.column && 'flex-direction:column;'};
  ${props => props.aic && 'align-items:center;'};
  ${props => props.jcc && 'justify-content:center;'};
`;

export const StyledContent = styled(Content)`
  background-color: ${gray};
`;
