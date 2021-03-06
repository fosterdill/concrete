import * as React from 'react';
import './font-styles.css';
import * as ReactDOM from 'react-dom';
import reset from 'styled-reset';
import { ChromePicker } from 'react-color';
import styled, { injectGlobal } from 'styled-components';
import { HashRouter } from 'react-router-dom';
import client from './client';
import { ApolloProvider, Mutation } from 'react-apollo';
import Sidebar from './components/sidebar';
import ToolbarButton from './components/toolbar-button';
import getBase64Image from './get-base-64-image';
import Editor from './components/editor';
import gql from 'graphql-tag';
import Query from 'react-apollo/Query';

injectGlobal`
  ${reset}

  html {
    height: 100%;
  }

  body {
    overflow: hidden;
    height: 100%;
    font-family: "Lato", sans-serif;
    color: rgb(120, 120, 120);
  }
`;

const OverlayBackground = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

const ToolbarDiv = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 342px;
`;

const PageDiv = styled.div`
  display: flex;
  height: 100%;
`;

document.onkeydown = (e) => {
  if (e.keyCode === 32) {
    const data = {
      keyboard: {
        isSpaceDown: true,
        __typename: 'Keyboard'
      }
    };

    client.writeData({ data });
  }
};

document.onkeyup = (e) => {
  if (e.keyCode === 32) {
    const data = {
      keyboard: {
        isSpaceDown: false,
        __typename: 'Keyboard'
      } 
    };

    client.writeData({ data });
  }
};

ReactDOM.render((
  <HashRouter>
    <ApolloProvider client={client}>
      <div style={{ height: '100%' }}>
        <ToolbarDiv>
          <ToolbarButton iconClass="icon-plus" text="Add an image" onClick={(event) => {
            event.preventDefault();
            const input = document.createElement('input');
            input.type = 'file';
            input.style.display = 'none';
            input.addEventListener('change', (event) => {
              const reader = new FileReader();

              reader.onload = (event) => {
                const image = document.createElement('img');
                image.onload = (event) => {
                  const imgData = getBase64Image(image);

                  localStorage.setItem(`img-1`, imgData || '');
                };

                if (event.target) {
                  image.src = event.target.result;
                }
              };

              if (input.files) {
                reader.readAsDataURL(input.files[0]);
              }
            })
            document.body.appendChild(input);
            input.click();
          }}/>
          <ToolbarButton iconClass="icon-down-circled" text="Download spec" onClick={() => {}} />
          <Mutation mutation={gql`
            mutation ToggleColorPicker {
              toggleColorPicker @client
            }
          `}>
            {(toggleColorPickerMutation) => (
              <div>
                <ToolbarButton 
                  iconClass="icon-paint-bucket" 
                  text="Change fill" 
                  onClick={() => { toggleColorPickerMutation(); }} 
                />
                <Query query={gql`
                  {
                    isColorPickerOpen @client
                  }
                `}>
                  {({ data: { isColorPickerOpen }}) => (
                    isColorPickerOpen && (
                      <div>
                        <OverlayBackground onClick={() => { toggleColorPickerMutation(); }}/>
                        <Mutation mutation={gql`
                          mutation ChangeFillColor($fillColor: FillColor) {
                            changeFillColor(fillColor: $fillColor) @client {
                              fillColor {
                                r
                                g
                                b
                                a
                              }
                            }
                          }
                        `}>
                          {(changeFillColor) => (
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
                                <ChromePicker 
                                  onChange={(color) => {
                                    changeFillColor({ variables: { fillColor: color.rgb }});
                                  }} 
                                  color={fillColor}
                                />
                              )}
                            </Query>
                          )}
                        </Mutation>
                      </div>
                    )
                  )}
                </Query>
              </div>
            )}
          </Mutation>
        </ToolbarDiv>
        <PageDiv>
          <Sidebar />
          <Editor />
        </PageDiv>
      </div>
    </ApolloProvider>
  </HashRouter>
), document.querySelector('#root'))
