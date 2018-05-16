import styled from 'styled-components';
import { Icon } from 'native-base';
import * as colors from './baseColors';

export const HalfButton = styled.TouchableHighlight`
  background-color: ${props => (props.bgcolor ? colors[props.bgcolor] : 'blue')};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 33.333%;
`;

export const StyledIcon = styled(Icon)`
  font-size: ${props => (props.fz ? `${props.fz}px` : '16px')};
  color: ${props => (props.color ? colors[props.color] : '#ffffff')};
`;

export const StyledText = styled.Text`
  font-size: ${props => (props.fz ? `${props.fz}px` : '16px')};
  color: ${props => (props.color ? colors[props.color] : '#ffffff')};
`;

export const Flex = styled.View`
  display: flex;
  ${props => props.row && 'flex-direction:row;'};
  ${props => props.column && 'flex-direction:column;'};
  ${props => props.aic && 'align-items:center;'};
  ${props => props.jcc && 'justify-content:center;'};
`;
