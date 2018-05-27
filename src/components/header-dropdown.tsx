import { Mutation } from "react-apollo";
import * as React from 'react';
import gql from 'graphql-tag';
import Query from "react-apollo/Query";
import styled from "styled-components";
const fontColor = "rgb(247, 248, 255)";

const HeaderDiv = styled.div`
  height: 34px;
  align-items: center;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  background: rgb(151, 151, 151);
  justify-content: space-between;
  color: ${fontColor};
  padding: 2px 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .22);
`;

const DropdownI = styled.i`
  font-size: 9px;
`;

const HeaderH1 = styled.h1`
  letter-spacing: 1.33px;
  line-height: 1.5;
  font-size: 20px;
  font-family: "PT Serif Caption", serif;
  color: ${fontColor};
`;

const DropdownDiv = styled.div`
  font-size: 14px;
`;

const DropdownSpan = styled.span`
  padding-right: 10px;
`;

const GetHeaderDropdown = gql`
  {
    sidebarHeader @client {
      isOpen
    }
    selectedTemplate @client {
      name
    }
  }
`;

const UpdateHeaderDropdown = gql`
  mutation UpdateHeaderDropdown ($isOpen: boolean) {
    updateHeaderDropdown(isOpen: $isOpen) @client
  }
`;

const HeaderDropdown: React.SFC = () => {
  return (
    <Query query={GetHeaderDropdown} fetchPolicy="network-only">
      {({ data: { sidebarHeader: { isOpen }, selectedTemplate: { name } }}) => (
        <Mutation mutation={UpdateHeaderDropdown} variables={{ isOpen: !isOpen }}>
          {(mutate) => (
            <HeaderDiv>
              <HeaderH1>
                spechelper
              </HeaderH1>
              <DropdownDiv>
                <DropdownSpan>
                  {name}
                </DropdownSpan>
                <DropdownI className="icon-down-open-big" />
              </DropdownDiv>
            </HeaderDiv>
          )}
        </Mutation>
      )}
    </Query>
  );
}

export default HeaderDropdown;