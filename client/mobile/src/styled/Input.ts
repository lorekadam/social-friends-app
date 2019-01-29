import styled from 'styled-components';
import colors from './colors';

interface Props {
  borderColor: string;
  color: string;
}

export const Input = styled.TextInput`
  padding: 10px;
  margin: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props: Props) =>
    props.borderColor ? props.borderColor : colors.white};
  width: 100%;
  color: ${(props: Props) => (props.color ? props.color : colors.white)};
`;
