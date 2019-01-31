import styled from 'styled-components';
import { Constants } from 'expo';

interface Props {
  statusBar?: boolean;
  padding?: number;
  height: string;
}

export const FlexView = styled.View`
  display: flex;
  flex: 1;
`;

export const PaddingView = styled.View`
  margin-top: ${(props: Props) =>
    props.statusBar ? Constants.statusBarHeight : 0};
  flex: 1;
  width: 100%;
  height: ${(props: Props) => (props.height ? props.height : '100%')};
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: ${(props: Props) => (props.padding ? `${props.padding}px` : '20px')};
`;

export const FullView = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
