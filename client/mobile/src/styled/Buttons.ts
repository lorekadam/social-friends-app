import styled from 'styled-components';
import colors from './colors';

interface Props {
  bgc?: string;
  disabled?: boolean;
  align?: string;
  size?: number;
  height?: number;
  full?: boolean;
}

export const Button = styled.TouchableOpacity`
  padding: 10px;
  margin: 10px;
  background-color: ${(props: Props) => (props.bgc ? props.bgc : colors.pink)};
  border-radius: 30px;
  width: ${(props: Props) => (props.full ? '100%' : 'auto')};
  height: ${(props: Props) => (props.height ? props.height : 'auto')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  opacity: ${(props: Props) => (props.disabled ? 0.7 : 1)};
`;

export const TextButton = styled.TouchableOpacity`
  border-radius: 30px;
  display: flex;
  justify-content: ${(props: Props) => (props.align ? props.align : 'center')};
  width: 100%;
`;

export const CircleButton = styled.TouchableOpacity`
  border-radius: ${(props: Props) => (props.size ? props.size / 2 : 17.5)};
  background-color: ${(props: Props) => (props.bgc ? props.bgc : colors.pink)};
  width: ${(props: Props) => (props.size ? props.size : 35)};
  height: ${(props: Props) => (props.size ? props.size : 35)};
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 auto;
`;
