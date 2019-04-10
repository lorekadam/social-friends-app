import styled from 'styled-components/native';
import colors from './colors';

interface Props {
  borderColor?: string;
  color?: string;
  flex?: number;
  minHeight?: number;
}

export const Input = styled.TextInput`
  padding: 10px;
  margin: 10px;
  display: flex;
  border-bottom-width: 1px;
  border-bottom-color: ${(props: Props) =>
    props.borderColor ? props.borderColor : colors.light1};
  color: ${(props: Props) => (props.color ? props.color : colors.light1)};
  ${(props: Props) => props.minHeight && `min-height: ${props.minHeight}`};
  flex: 1;
`;

export const RoundedInput = styled(Input)`
  display: flex;
  padding: 3px 10px;
  border-radius: 30px;
  border: ${(props: Props) =>
    `1px solid ${props.borderColor ? props.borderColor : colors.light1}`};
  font-size: 12px;
`;
