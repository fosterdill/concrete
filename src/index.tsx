import * as React from 'react';
import './font-styles.css';
import * as ReactDOM from 'react-dom';
import reset from 'styled-reset';
import { injectGlobal } from 'styled-components';
import { HashRouter } from 'react-router-dom';
import client from './client';
import { ApolloProvider } from 'react-apollo';
import Sidebar from './components/sidebar';

injectGlobal`
  ${reset}

  html {
    height: 100%;
  }

  body {
    height: 100%;
    font-family: "Lato", sans-serif;
    color: rgb(120, 120, 120);
  }
`;

ReactDOM.render((
  <HashRouter>
    <ApolloProvider client={client}>
      <Sidebar />
    </ApolloProvider>
  </HashRouter>
), document.body)
