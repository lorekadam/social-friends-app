import styled from 'styled-components';
import * as colors from './colors';

export const Success = styled.View`
  padding: 10px;
  margin: 10px;
  border: 1px solid ${colors.success};
  background-color: ${colors.success};
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 30px;
`;
