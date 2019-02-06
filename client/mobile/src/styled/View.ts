import styled from 'styled-components';
import { Constants } from 'expo';

interface Props {
  statusBar?: boolean;
  padding?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingLeft?: number;
  paddingBottom?: number;
  height?: string;
}

export const FlexView = styled.View`
  display: flex;
  flex: 1;
`;

const OnlyPadding = styled.View`
  padding: ${(props: Props) => (props.padding ? `${props.padding}px` : '20px')};
  ${(props: Props) => props.paddingTop && `padding-top:${props.paddingTop}px`}
  ${(props: Props) =>
    props.paddingRight && `padding-right:${props.paddingRight}px`}
  ${(props: Props) =>
    props.paddingLeft && `padding-left:${props.paddingLeft}px`}
  ${(props: Props) =>
    props.paddingBottom && `padding-bottom:${props.paddingBottom}px`}
`;

export const PaddingView = styled(OnlyPadding)`
  margin-top: ${(props: Props) =>
    props.statusBar ? Constants.statusBarHeight : 0};
  flex: 1;
  width: 100%;
  height: ${(props: Props) => (props.height ? props.height : '100%')};
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const SimpleView = styled(OnlyPadding)`
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const FullView = styled.View`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
