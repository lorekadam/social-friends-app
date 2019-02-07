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
    props.borderColor ? props.borderColor : colors.light1};
  width: 100%;
  color: ${(props: Props) => (props.color ? props.color : colors.light1)};
`;

export const RoundedInput = styled(Input)`
  padding: 3px 10px;
  border-radius: 30px;
  border: ${(props: Props) =>
    `1px solid ${props.borderColor ? props.borderColor : colors.light1}`};
  font-size: 12px;
`;
