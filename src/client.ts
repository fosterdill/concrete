import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';
import { keys } from 'lodash';

const cache = new InMemoryCache();
let boxId = 1;

const defaults = {
  isColorPickerOpen: false,

  editorBox: {
    topLeft: {
      x: null,
      y: null,
      __typename: 'TopLeft'
    },
    __typename: 'EditorBox'
  },

  dataConfigs: [],

  fillColor: { 
    r: 253, 
    g: 252, 
    b: 255, 
    a: 0.5,
    __typename: 'FillColor'
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
    name: 'basic'
  },

  repos: [
    'https://fosterdill.github.io/concrete/src/templates/basic/'
  ]
};

const resolvers = {
  Query: {
    configs: async (_: any, __: any, { cache }: any) => {
      const { repos } = cache.readQuery({
        query: gql`
          {
            repos
          }
        `
      });

      const data = {
        configs: {
          __typename: 'Configs'
        }
      };

      repos.forEach(async (repoUrl: string) => {
        const config = await fetch(`${repoUrl}config.json`).then((response) => response.json());

        keys(config.defaults).forEach(async (key) => {
          const fileName = config.defaults[key];

          const object = await fetch(`${repoUrl}${fileName}`).then((response) => response.json());
          config.defaults[key] = object;
          config.defaults[key].__typename = object.title;
        })

        config.template = await fetch(`${repoUrl}${config.template}`).then((response) => response.json());
        config.template.__typename = 'Template';

        data.configs[config.name] = config;
      });

      return data;
    }
  },

  Mutation: {
    changeFillColor(_: any, { fillColor }: any, { cache }: any) {
      const data = {
        fillColor: {
          r: fillColor.r,
          g: fillColor.g,
          b: fillColor.b,
          a: fillColor.a,
          __typename: 'FillColor'
        }
      };

      cache.writeData({ data });

      return data;
    },

    toggleColorPicker(_: any, __: any, { cache }: any) {
      const previous = cache.readQuery({ query: gql`
        {
          isColorPickerOpen
        }
      `});

      const data = {
        isColorPickerOpen: !previous.isColorPickerOpen
      }

      cache.writeData({ data });

      return data;
    },

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
