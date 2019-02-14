import styled from 'styled-components/native';
import colors from './colors';

export const ResultsWrapper = styled.ScrollView`
  display: flex;
  width: 100%;
  max-height: 240;
  border: 1px solid ${colors.light1};
  overflow: hidden;
`;

export const Item = styled.View`
  width: 100%;
  padding: 10px;
  border-bottom-color: ${colors.light1};
  border-bottom-width: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 60;
`;
