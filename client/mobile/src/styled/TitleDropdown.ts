import styled from 'styled-components';
import colors from './colors';

interface Props {
  active: boolean;
}

export const TitleDropdown = styled.TouchableOpacity`
  position: relative;
  padding: 15px 25px;
  border-left-width: 3px;
  border-left-color: ${(props: Props) =>
    props.active ? colors.color2 : 'transparent'};
  background-color: ${(props: Props) =>
    props.active ? `rgba(255,255,255,0.05)` : 'transparent'};
  display: flex;
  width: 100%;
`;
