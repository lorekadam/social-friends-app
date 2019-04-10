import styled from 'styled-components/native';

interface Props {
  noGutters?: boolean;
  direction?: string;
  align?: string;
  justify?: string;
  flex?: number;
  height?: number;
}

export const Row = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: ${(props: Props) => (props.align ? props.align : 'flex-start')};
  justify-content: ${(props: Props) =>
    props.justify ? props.justify : 'flex-start'};
  margin: ${(props: Props) => (props.noGutters ? 0 : '0 -10px')};
  ${(props: Props) => props.height && `height:${props.height}%`};
`;

export const Col = styled.View`
  padding: ${(props: Props) => (props.noGutters ? 0 : '0 10px')};
  display: flex;
  flex-direction: ${(props: Props) =>
    props.direction ? props.direction : 'row'};
  align-items: ${(props: Props) => (props.align ? props.align : 'flex-start')};
  justify-content: ${(props: Props) =>
    props.justify ? props.justify : 'flex-start'};
  flex: ${(props: Props) => (props.flex ? props.flex : 1)};
`;

export const RowColumn = styled(Row)`
  height: 100%;
  flex-direction: column;
  padding: 0;
  margin: 0;
`;

export const ColColumn = styled(Col)`
  flex: 1;
  width: 100%;
  padding: 0;
`;
