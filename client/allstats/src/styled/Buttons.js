import styled from 'styled-components';
import * as colors from './colors';

export const Button = styled.TouchableOpacity`
  padding: 10px;
  margin: 10px;
  background-color: ${colors.extra3};
  border-radius: 30px;
  color: ${colors.white};
  width: 100%;
  display: flex;
  align-items: center;
`;

export const TextButton = styled.TouchableOpacity`
  border-radius: 30px;
  display: flex;
  justify-content: ${(props) => (props.align ? props.align : 'center')};
`;
