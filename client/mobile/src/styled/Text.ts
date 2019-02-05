import styled from 'styled-components';
import colors from './colors';
import * as globals from './globals';

interface Props {
  color?: string;
  size?: number;
}

export const Text = styled.Text`
  font-family: 'roboto-light';
  color: ${(props: Props) => (props.color ? props.color : colors.defaultText)};
  font-size: ${(props: Props) =>
    props.size ? props.size : globals.defaultSize};
`;
