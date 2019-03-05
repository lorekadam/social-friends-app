import styled from 'styled-components/native';
import colors from './colors';
import * as globals from './globals';

interface Props {
  color?: string;
  size?: number;
  align?: string;
  font?: string;
}

export const Text = styled.Text`
  font-family: ${(props: Props) => (props.font ? props.font : 'roboto-light')};
  color: ${(props: Props) => (props.color ? props.color : colors.light1)};
  font-size: ${(props: Props) =>
    props.size ? props.size : globals.defaultSize};
  ${(props: Props) => props.align && `text-align:${props.align}`}
`;
