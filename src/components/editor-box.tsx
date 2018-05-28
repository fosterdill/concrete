import styled from "styled-components";
import * as React from "react";

interface Props {
  topLeft?: { x: number, y: number } | null;
  bottomRight?: { x: number, y: number } | null;
  parentRef?: any;
  isActive?: boolean;
  fillColor: {
    r: number;
    g: number;
    b: number;
    a: number;
  }
}

const EditorBoxDiv = styled.div`
  position: absolute;
  cursor: pointer;
  background: rgba(${(props: Props) => props.fillColor.r}, ${(props: Props) => props.fillColor.g}, ${(props: Props) => props.fillColor.b}, ${(props: Props) => props.fillColor.a});
  border: 1px solid ${(props) => (
    props.isActive
      ? 'rgb(151,151,151)'
      : 'rgb(231, 231, 231)'

  )};
  top: ${(props: Props) => props.topLeft ? props.topLeft.y : 0}px;
  left: ${(props: Props) => props.topLeft ? props.topLeft.x : 0}px;
  width: ${(props: Props) => props.topLeft && props.bottomRight ? props.bottomRight.x - props.topLeft.x : 0}px;
  height: ${(props: Props) => props.topLeft && props.bottomRight ? props.bottomRight.y - props.topLeft.y : 0}px;
`;

const EditorBox = ({ parentRef, topLeft, bottomRight, fillColor }: Props) => {
  return (
    <EditorBoxDiv fillColor={fillColor} innerRef={parentRef} topLeft={topLeft} bottomRight={bottomRight} />
  );
};

export default EditorBox;