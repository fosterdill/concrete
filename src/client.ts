import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';

const cache = new InMemoryCache();

const defaults = {
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
