import styled from 'styled-components';
import colors from './colors';

interface Props {
  error?: string;
}

export const Notification = styled.View`
  padding: 5px 15px;
  margin: 10px;
  background-color: ${(props: Props) =>
    props.error ? colors.error : colors.success};
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 30px;
  width: 100%;
`;
