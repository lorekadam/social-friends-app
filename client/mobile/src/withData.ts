import ApolloClient from 'apollo-boost';
import { endpoint } from './endpoint';
import { LOCAL_TOGGLE_QUERY } from './pages/PageSpine';

import { AsyncStorage } from 'react-native';

const initialState = {
  sidebarOpen: false,
  notificationsOpen: false,
  settingsOpen: false,
  friendsOpen: false
};

export default function createClient() {
  return new ApolloClient({
    uri: endpoint,
    request: async (operation) => {
      const token = await AsyncStorage.getItem('token');
      operation.setContext({
        fetchOptions: {
          credentials: 'include'
        },
        headers: {
          authorization: token || ''
        }
      });
    },
    clientState: {
      resolvers: {
        Mutation: {
          clearLocalState(_, variables, { cache }) {
            const data = { data: initialState };
            cache.writeData(data);
            return data;
          },
          toggleSidebar(_, variables, { cache }) {
            const { sidebarOpen } = cache.readQuery({
              query: LOCAL_TOGGLE_QUERY
            });
            const data = {
              data: {
                sidebarOpen: !sidebarOpen
              }
            };
            cache.writeData(data);
            return data;
          },
          toggleSettings(_, variables, { cache }) {
            const { settingsOpen } = cache.readQuery({
              query: LOCAL_TOGGLE_QUERY
            });
            const data = {
              data: {
                settingsOpen: !settingsOpen
              }
            };
            cache.writeData(data);
            return data;
          },
          toggleFriends(_, variables, { cache }) {
            const { friendsOpen } = cache.readQuery({
              query: LOCAL_TOGGLE_QUERY
            });
            const data = {
              data: {
                friendsOpen: !friendsOpen
              }
            };
            cache.writeData(data);
            return data;
          },
          toggleNotifications(_, variables, { cache }) {
            const { notificationsOpen } = cache.readQuery({
              query: LOCAL_TOGGLE_QUERY
            });
            const data = {
              data: {
                notificationsOpen: !notificationsOpen
              }
            };
            cache.writeData(data);
            return data;
          }
        }
      },
      defaults: initialState
    }
  });
}
