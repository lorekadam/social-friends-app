import styled from 'styled-components';

interface Props {
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
}

export const Absolute = styled.View`
  position: absolute;
  ${(props: Props) => props.top && `top: ${props.top}`};
  ${(props: Props) => props.right && `right: ${props.right}`};
  ${(props: Props) => props.bottom && `bottom: ${props.bottom}`};
  ${(props: Props) => props.left && `left: ${props.left}`};
`;
