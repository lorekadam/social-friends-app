import styled from 'styled-components';
import colors from './colors';

interface Props {
  active: boolean;
}

export const TitleDropdown = styled.TouchableOpacity`
  position: relative;
  padding: 10px 20px;
  border-left-width: 3px;
  border-left-color: ${(props: Props) =>
    props.active ? colors.color2 : 'transparent'};
  display: flex;
  width: 100%;
`;
