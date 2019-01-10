import styled from 'styled-components';

interface Props {
  noGutters?: boolean;
  direction?: string;
  align?: string;
  justify?: string;
  flex?: number;
}

export const Row = styled.View`
  display: flex;
  flex-direction: ${(props: Props) =>
    props.direction ? props.direction : 'row'};
  align-items: ${(props: Props) => (props.align ? props.align : 'flex-start')};
  justify-content: ${(props: Props) =>
    props.justify ? props.justify : 'flex-start'};
  margin: ${(props: Props) => (props.noGutters ? 0 : '0 -10px')};
`;

export const Col = styled.View`
  padding: 0 10px;
  display: flex;
  flex-direction: ${(props: Props) =>
    props.direction ? props.direction : 'row'};
  align-items: ${(props: Props) => (props.align ? props.align : 'flex-start')};
  justify-content: ${(props: Props) =>
    props.justify ? props.justify : 'flex-start'};
  flex: ${(props: Props) => (props.flex ? props.flex : 1)};
`;
