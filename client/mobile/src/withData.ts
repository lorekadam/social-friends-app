import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { AsyncStorage } from 'react-native';
import { endpoint } from './endpoint';
import { LOCAL_TOGGLE_QUERY } from './pages/PageSpine';

const initialState = {
  notificationsOpen: false,
  settingsOpen: false,
  friendsOpen: false,
};

export default function createClient() {
  return new ApolloClient({
    uri: endpoint,
    request: async operation => {
      const token = await AsyncStorage.getItem('token');
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers: {
          authorization: token || '',
        },
      });
    },
    cache: new InMemoryCache(),
    clientState: {
      resolvers: {
        Mutation: {
          clearLocalState(_: any, variables: any, { cache }: any) {
            const data = { data: initialState };
            cache.writeData(data);
            return data;
          },
          toggleSettings(_: any, variables: any, { cache }: any) {
            const { settingsOpen } = cache.readQuery({
              query: LOCAL_TOGGLE_QUERY,
            });
            const data = {
              data: {
                settingsOpen: !settingsOpen,
              },
            };
            cache.writeData(data);
            return data;
          },
          toggleFriends(_: any, variables: any, { cache }: any) {
            const { friendsOpen } = cache.readQuery({
              query: LOCAL_TOGGLE_QUERY,
            });
            const data = {
              data: {
                friendsOpen: !friendsOpen,
              },
            };
            cache.writeData(data);
            return data;
          },
          toggleNotifications(_: any, variables: any, { cache }: any) {
            const { notificationsOpen } = cache.readQuery({
              query: LOCAL_TOGGLE_QUERY,
            });
            const data = {
              data: {
                notificationsOpen: !notificationsOpen,
              },
            };
            cache.writeData(data);
            return data;
          },
        },
      },
      defaults: initialState,
    },
  });
}
