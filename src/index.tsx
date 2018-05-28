import * as React from 'react';
import './font-styles.css';
import * as ReactDOM from 'react-dom';
import reset from 'styled-reset';
import styled, { injectGlobal } from 'styled-components';
import { HashRouter } from 'react-router-dom';
import client from './client';
import { ApolloProvider } from 'react-apollo';
import Sidebar from './components/sidebar';
import ToolbarButton from './components/toolbar-button';
import getBase64Image from './get-base-64-image';
import Editor from './components/editor';

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
      </ToolbarDiv>
      <PageDiv>
        <Sidebar />
        <Editor />
      </PageDiv>
    </ApolloProvider>
  </HashRouter>
), document.querySelector('#root'))
