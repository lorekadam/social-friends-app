import styled from 'styled-components';
import colors from './colors';

export const Notification = styled.View`
  padding: 10px;
  margin: 10px;
  background-color: ${(props) => (props.error ? colors.error : colors.success)};
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 30px;
  width: 100%;
`;
