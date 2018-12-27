import styled from 'styled-components';
import { Constants } from 'expo';

export const View = styled.View`
  margin-top: ${Constants.statusBarHeight};
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
