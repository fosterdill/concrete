import * as React from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import EditorBox from './editor-box';

const getImageOffsetX = (element: Element | null) => {
  if (element) {
    return element.getBoundingClientRect().left - 342
  }

  return 0;
};

const getImageOffsetY = (element: Element | null) => {
  if (element) {
    return element.getBoundingClientRect().top
  }

  return 0;
};

let something = {
  currentBox: React.createRef()
};
let someref: React.RefObject<HTMLDivElement> = React.createRef();

interface Props {
  isSpaceDown: boolean;
}

const EditorDiv = styled.div`
  cursor: ${(props: Props) => (
    props.isSpaceDown ? 'move' : 'crosshair'
  )}
`;

const StyledImage = styled.img`
  user-select: none;
  box-shadow: 0 0 4px rgba(201, 201, 201, .2);
  border: 1px solid rgb(215, 215, 215);
`;

const startDragging = gql`
  mutation StartDragging ($x: number, $y: number) {
    startDragging(x: $x, y: $y) @client
  }
`;

const stopDragging = gql`
  mutation StopDragging ($x: number, $y: number) {
    stopDragging(x: $x, y: $y) @client
  }
`;

const Editor: React.SFC = () => (
    <Query query={gql`
      {
        keyboard @client {
          isSpaceDown
        }

        editorBox @client {
          topLeft {
            x
            y
          }
        }

        createdEditorBoxes  @client {
          id
          topLeft {
            x
            y
          }
          bottomRight {
            x
            y
          }
        }
      }
    `}>
      {({ data: { keyboard: { isSpaceDown }, createdEditorBoxes, editorBox: { topLeft }}}) => {
        return (
          <Mutation mutation={startDragging}>
            {(startDraggingMutation) => (
              <Mutation mutation={stopDragging}>
                {(stopDraggingMutation) => (
                  <EditorDiv 
                    onMouseDown={(event) => {
                      if (!isSpaceDown) {
                        startDraggingMutation({ variables: { x: event.clientX - 342 - getImageOffsetX(someref.current), y: event.clientY - getImageOffsetY(someref.current) }});
                      }
                    }}
                    onMouseUp={(event) => {
                      if (!isSpaceDown && typeof topLeft.x === 'number' && typeof topLeft.y === 'number') {
                        stopDraggingMutation({ variables: { x: event.clientX - 342 - getImageOffsetX(someref.current), y: event.clientY - getImageOffsetY(someref.current) }});
                      }
                    }}
                    onMouseMove={(event) => {
                      if (something.currentBox.current) {
                        const element = (something.currentBox.current as any);

                        element.style.top = `${topLeft.y}px`;
                        element.style.left = `${topLeft.x}px`;
                        element.style.width = `${(event.clientX - 342 - getImageOffsetX(someref.current)) - topLeft.x}px`;
                        element.style.height = `${event.clientY - getImageOffsetY(someref.current) - topLeft.y}px`;
                      }
                    }}
                    isSpaceDown={isSpaceDown}
                  >
                    <Draggable disabled={!isSpaceDown}>
                      <div ref={someref}>
                        <StyledImage draggable={false} src={`data:image/png;base64,${localStorage.getItem('img-1')}`} />
                        {topLeft.x && topLeft.y &&
                          <Query query={gql`
                            {
                              fillColor {
                                r
                                g
                                b
                                a
                              }
                            }
                          `}>
                            {({ data: { fillColor }}) => (
                              <EditorBox fillColor={fillColor} parentRef={something.currentBox} />
                            )}
                          </Query>
                        }
                        {createdEditorBoxes.map(({ id, topLeft, bottomRight }: any) => (
                          <Query query={gql`
                            {
                              fillColor {
                                r
                                g
                                b
                                a
                              }
                            }
                          `}>
                            {({ data: { fillColor }}) => (
                              <EditorBox fillColor={fillColor} key={id} topLeft={topLeft} bottomRight={bottomRight} />
                            )}
                          </Query>
                        ))}
                      </div>
                    </Draggable>
                  </EditorDiv>
                )}
              </Mutation>
            )}
          </Mutation>
        );
      }}
    </Query>
);

export default Editor;