import styled from 'styled-components';
import { Constants } from 'expo';

interface Props {
  height: string;
}

export const PaddingView = styled.View`
  margin-top: ${Constants.statusBarHeight};
  flex: 1;
  width: 100%;
  height: ${(props: Props) => (props.height ? props.height : '100%')};
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
`;

export const FullView = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
