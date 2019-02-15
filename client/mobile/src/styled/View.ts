import styled from 'styled-components/native';
import { Constants } from 'expo';

interface Props {
  statusBar?: boolean;
  padding?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  height?: string;
  justify?: string;
  align?: string;
  direction?: string;
  flex?: string;
  bgColor?: string;
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
    props.paddingBottom && `padding-bottom:${props.paddingBottom}px`}
  ${(props: Props) =>
    props.paddingLeft && `padding-left:${props.paddingLeft}px`}
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
  flex-direction: ${(props: Props) =>
    props.direction ? props.direction : 'column'};
  justify-content: ${(props: Props) =>
    props.justify ? props.justify : 'flex-start'};
  align-items: ${(props: Props) => (props.align ? props.align : 'center')};
  ${(props: Props) => props.flex && `flex:${props.flex}`}
  ${(props: Props) => props.bgColor && `background-color:${props.bgColor}`}
`;

export const FullView = styled.View`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
