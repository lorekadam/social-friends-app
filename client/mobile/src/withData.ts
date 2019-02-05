import ApolloClient from 'apollo-boost';
import { endpoint } from './endpoint';
import { LOCAL_TOGGLE_QUERY } from './pages/PageSpine';

import { AsyncStorage } from 'react-native';

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
          toggleSidebar(_, variables, { cache }) {
            //read state
            const { sidebarOpen } = cache.readQuery({
              query: LOCAL_TOGGLE_QUERY
            });
            // write state
            const data = {
              data: {
                sidebarOpen: !sidebarOpen
              }
            };
            cache.writeData(data);
            return data;
          },
          toggleSettings(_, variables, { cache }) {
            //read state
            const { settingsOpen } = cache.readQuery({
              query: LOCAL_TOGGLE_QUERY
            });
            // write state
            const data = {
              data: {
                settingsOpen: !settingsOpen
              }
            };
            cache.writeData(data);
            return data;
          },
          toggleFriends(_, variables, { cache }) {
            //read state
            const { friendsOpen } = cache.readQuery({
              query: LOCAL_TOGGLE_QUERY
            });
            // write state
            const data = {
              data: {
                friendsOpen: !friendsOpen
              }
            };
            cache.writeData(data);
            return data;
          },
          toggleNotifications(_, variables, { cache }) {
            //read state
            const { notificationsOpen } = cache.readQuery({
              query: LOCAL_TOGGLE_QUERY
            });
            // write state
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
      defaults: {
        sidebarOpen: false,
        notificationsOpen: false,
        settingsOpen: false,
        friendsOpen: false
      }
    }
  });
}
