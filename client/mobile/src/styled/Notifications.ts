import styled from 'styled-components/native';
import colors from './colors';

interface Props {
  viewed: boolean;
}

export const NotificationItem = styled.View`
  padding: 5px;
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props: Props) =>
    props.viewed ? colors.light2 : colors.light1};
`;
