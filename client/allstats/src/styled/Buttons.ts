import styled from 'styled-components';
import colors from './colors';

export const Button = styled.TouchableOpacity`
  padding: 10px;
  margin: 10px;
  background-color: ${(props) => (props.bg ? props.bg : colors.pink)};
  border-radius: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
`;

export const TextButton = styled.TouchableOpacity`
  border-radius: 30px;
  display: flex;
  justify-content: ${(props) => (props.align ? props.align : 'center')};
  width: 100%;
`;

export const CircleButton = styled.TouchableOpacity`
  border-radius: ${(props) => (props.size ? props.size / 2 : 17.5)};
  background-color: ${(props) => (props.bg ? props.bg : colors.pink)};
  width: ${(props) => (props.size ? props.size : 35)};
  height: ${(props) => (props.size ? props.size : 35)};
  position: absolute;
  top: 10;
  left: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;
