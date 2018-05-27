import styled from "styled-components";
import * as React from "react";

type Props =
  | { children: any, canAddMoreOnHover: true, onAddMore: () => void }
  | { children: any, canAddMoreOnHover?: false, onAddMore?: () => void }

const StyledImageContainer = styled.div`
  text-align: center;
  max-height: 0px;
  overflow: hidden;
  transition: max-height .3s;
  padding-top: 12px;
`;

const StyledButton = styled.button`
  border: none;
  padding: 4px;
  outline: none;
  cursor: pointer;
  border-radius: none;
  background: inherit;

  &:active {
    background: rgb(0, 0, 0, .05);
  }
`;

const Wrapper = styled.div`
  padding: 16px 12px;
  font-size: 14px;
  transition: background .3s;

  &:hover ${StyledImageContainer} {
    max-height: 21px;
  }

  &:hover {
    background: rgb(249, 249, 249);
  }
`

class SidebarComponent extends React.Component<Props> {
  public render() {
    const { 
      canAddMoreOnHover,
      onAddMore,
      children
    } = this.props;

    return (
      <Wrapper>
        {children}
        {canAddMoreOnHover && 
          <StyledImageContainer>
            <StyledButton onClick={onAddMore}><img src="public/plus.svg" /></StyledButton>
          </StyledImageContainer>
        }
      </Wrapper>
    );
  }
}

export default SidebarComponent;