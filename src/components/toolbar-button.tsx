import styled from 'styled-components';
import * as React from 'react';
import { headerStyles } from '../style-vars';

interface Props {
  iconClass: string;
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const StyledButton = styled.button`
  ${headerStyles}
  cursor: pointer;
  outline: none;
  box-shadow: 0 0 4px rgba(0, 0, 0, .22);
  border: none;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;
  max-width: 32px;
  transition: max-width 0.1s linear;

  &:hover {
    max-width: 150px;
  }
`;

const StyledI = styled.i`
  font-size: 18px;
  position: relative;
  top: 3px;
`;

const StyledSpan = styled.span`
  font-size: 14px;
  padding-left: 8px;
  padding-right: 8px;
`;

const ToolbarButton = ({ onClick, iconClass, text }: Props) => (
  <StyledButton onClick={onClick}>
    <StyledI className={iconClass} />
    <StyledSpan>{text}</StyledSpan>
  </StyledButton>
);

export default ToolbarButton;