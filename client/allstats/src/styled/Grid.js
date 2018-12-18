import styled from 'styled-components';

export const Row = styled.View`
  display: flex;
  flex-direction: ${(props) => (props.direction ? props.direction : 'row')};
  align-items: ${(props) => (props.align ? props.align : 'flex-start')};
  justify-content: ${(props) => (props.justify ? props.justify : 'flex-start')};
  margin: 0 -10px;
`;

export const Col = styled.View`
  padding: 0 10px;
  flex: 1;
`;
