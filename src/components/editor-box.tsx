import styled from "styled-components";
import * as React from "react";

interface Props {
  topLeft?: { x: number, y: number } | null;
  bottomRight?: { x: number, y: number } | null;
  parentRef?: any;
}

const EditorBoxDiv = styled.div`
  position: absolute;
  background: rgba(253, 252, 255, 0.5);
  border: 1px solid rgb(231, 231, 231);
  top: ${(props: Props) => props.topLeft ? props.topLeft.y : 0}px;
  left: ${(props: Props) => props.topLeft ? props.topLeft.x : 0}px;
  width: ${(props: Props) => props.topLeft && props.bottomRight ? props.bottomRight.x - props.topLeft.x : 0}px;
  height: ${(props: Props) => props.topLeft && props.bottomRight ? props.bottomRight.y - props.topLeft.y : 0}px;
`;

const EditorBox = ({ parentRef, topLeft, bottomRight }: Props) => {
  return (
    <EditorBoxDiv innerRef={parentRef} topLeft={topLeft} bottomRight={bottomRight} />
  );
};

export default EditorBox;