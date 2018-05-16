import styled from 'styled-components';

const Screen = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  background-color: black;
  ${props => props.row && 'flex-direction:row;'};
  ${props => props.column && 'flex-direction:column;'};
  ${props => props.aic && 'align-items:center;'};
  ${props => props.jcc && 'justify-content:center;'};
`;

export default Screen;
