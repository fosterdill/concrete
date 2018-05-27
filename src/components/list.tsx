import { componentStyles, inputStyles } from "../style-vars";
import * as React from "react";
import styled from "styled-components";
import TextField from "./text-field";

const TextFieldContainerDiv = styled.div`
  border-bottom: 1px solid rgb(231,231,231);
`;

const ListContent = styled.ul`
  ${componentStyles}
  ${inputStyles}
  display: block;
  border: none;
  width: 100%;
  resize: none;
  box-sizing: border-box;
`;

const ListItem = styled.li`
  border-left: 1px solid rgb(200,200,200);
  margin: 6px 0;
  padding-left: 6px;
`;

const list = [
  "This a test",
  "This is a really really long string. This is a really really long string. This is a really really long string. ",
  "And another test"
];

const List: React.SFC = () => (
  <div>
    <TextFieldContainerDiv>
      <TextField />
    </TextFieldContainerDiv>
    <ListContent>
      {list.map((item) => (
        <ListItem>{item}</ListItem>
      ))}
    </ListContent>
  </div>
);

export default List;