import styled from "styled-components";
import * as React from "react";
import HeaderDropdown from "./header-dropdown";
import SidebarSectionHeader from "./sidebar-section-header";
import Dropdown from "./dropdown";
import SidebarComponent from "./sidebar-component";
import TextArea from "./text-area";
import TextField from "./text-field";
import List from "./list";

const SidebarContentDiv = styled.div`
`;

const SidebarDiv = styled.div`
  width: 342px;
  height: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .06);
  border-right: 1px solid rgb(215, 215, 215);
  background: rgb(253, 252, 255);
`;

const Sidebar: React.SFC = () => (
  <SidebarDiv>
    <HeaderDropdown />
    <SidebarSectionHeader>
      TYPE
    </SidebarSectionHeader>
    <SidebarContentDiv>
      <SidebarComponent canAddMoreOnHover={false}>
        <Dropdown />
      </SidebarComponent>
    </SidebarContentDiv>
    <SidebarSectionHeader>
      FIELDS
    </SidebarSectionHeader>
    <SidebarContentDiv>
      <SidebarComponent canAddMoreOnHover={false}>
        <TextArea />
      </SidebarComponent>
      <SidebarComponent canAddMoreOnHover={false}>
        <TextField />
      </SidebarComponent>
      <SidebarComponent canAddMoreOnHover={false}>
        <List />
      </SidebarComponent>
    </SidebarContentDiv>
  </SidebarDiv>
);

export default Sidebar;