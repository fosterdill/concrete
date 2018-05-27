import { componentStyles, inputStyles } from "../style-vars";
import * as React from "react";
import styled from "styled-components";

const TextFieldDiv = styled.div`
  ${componentStyles}
`;

const StyledInput = styled.input`
  ${inputStyles}
  padding-left: 6px;
  margin-left: 6px;
  border-left: 1px solid rgb(231,231,231);
  width: 100%;
`;

const TextField: React.SFC = () => (
  <TextFieldDiv>
    Name
    <StyledInput type="text" />
  </TextFieldDiv>
);

export default TextField;