import styled from 'styled-components';
import * as colors from './colors';
import * as globals from './globals';

export const Text = styled.Text`
  color: ${(props) => (props.color ? props.color : colors.defaultText)};
  font-size: ${(props) => (props.size ? props.zise : globals.defaultSize)};
`;
