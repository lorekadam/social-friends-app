import styled from 'styled-components';
import colors from './colors';

export const Error = styled.View`
  padding: 10px;
  margin: 10px;
  border: 1px solid ${colors.error};
  background-color: ${colors.error};
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 30px;
`;
