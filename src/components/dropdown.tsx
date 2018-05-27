import styled from "styled-components";
import * as React from "react";
import { componentStyles } from "../style-vars";

const DropdownDiv = styled.div`
  ${componentStyles}
  cursor: pointer;
  justify-content: space-between;
`;

const DropdownI = styled.i`
  font-size: 11px;
  position: relative;
  top: 3px;
`;

const Dropdown: React.SFC = () => (
  <DropdownDiv>
    Component
    <DropdownI className="icon-down-open-big" />
  </DropdownDiv>
);

export default Dropdown;