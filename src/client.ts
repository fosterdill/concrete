import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';

const cache = new InMemoryCache();
let boxId = 1;

const defaults = {
  editorBox: {
    topLeft: {
      x: null,
      y: null,
      __typename: 'TopLeft'
    },
    __typename: 'EditorBox'
  },

  createdEditorBoxes: [],

  keyboard: {
    isSpaceDown: false,
    __typename: 'Keyboard'
  },

  sidebarHeader: {
    isOpen: false,
    __typename: 'SidebarHeader'
  },

  selectedTemplate: {
    __typename: 'Template',
    id: 1,
    name: 'Basic'
  }
};

const resolvers = {
  Mutation: {
    startDragging(_: any, { x, y }: any, { cache }: any) {
      const data = {
        editorBox: {
          topLeft: { x, y, __typename: 'TopLeft' },
          __typename: 'EditorBox'
        }
      };

      cache.writeData({ data });

      return data;
    },

    stopDragging(_: any, { x, y }: any, { cache }: any) {
      const previous = cache.readQuery({ query: gql`
        {
          createdEditorBoxes {
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
          editorBox {
            topLeft {
              x
              y
            }
          }
        }
      `});

      const data = {
        editorBox: {
          topLeft: {
            x: null,
            y: null,
            __typename: 'TopLeft'
          },
          __typename: 'EditorBox'
        },

        createdEditorBoxes: previous.createdEditorBoxes.concat([
          {
            id: boxId++,
            topLeft: { 
              x: previous.editorBox.topLeft.x, 
              y: previous.editorBox.topLeft.y, 
              __typename: 'TopLeft' 
            },
            bottomRight: { 
              x, 
              y, 
              __typename: 'BottomRight' 
            },
            __typename: 'CreatedEditorBox'
          }
        ])
      };

      cache.writeData({ data });

      return data;
    },

    updateHeaderDropdown(_: any, { isOpen }: any, { cache }: any) {
      const data = {
        sidebarHeader: {
          isOpen,
          __typename: 'SidebarHeader'
        }
      };

      cache.writeData({ data });

      return data;
    }
  }
};

const stateLink = withClientState({
  defaults,
  cache,
  resolvers
});


export default new ApolloClient({
  cache,
  link: stateLink
});
