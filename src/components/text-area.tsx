import { componentStyles, inputStyles } from "../style-vars";
import * as React from "react";
import styled from "styled-components";

const TextAreaLabel = styled.div`
  ${componentStyles}
  border-bottom: 1px solid rgb(231,231,231);
`;

const TextAreaInput = styled.textarea`
  ${componentStyles}
  ${inputStyles}
  border: none;
  width: 100%;
  resize: none;
  height: 100px;
  box-sizing: border-box;
`;

const TextArea: React.SFC = () => (
  <div>
    <TextAreaLabel>
      Name
    </TextAreaLabel>
    <TextAreaInput />
  </div>
);

export default TextArea;