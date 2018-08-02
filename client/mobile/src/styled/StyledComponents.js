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
  ${props => props.center && 'text-align:center;'};
`;

export const Flex = styled.View`
  display: flex;
  width: 100%;
  ${props => props.row && 'flex-direction:row;'};
  ${props => props.column && 'flex-direction:column;'};
  ${props => props.aic && 'align-items:center;'};
  ${props => props.jcc && 'justify-content:center;'};
  ${props => props.width && `width:${props.width}`};
`;

export const StatsRow = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
`;

export const StatItem = styled.View`
  display: flex;
  justify-content: center;
  width: 33.333%;
`;
