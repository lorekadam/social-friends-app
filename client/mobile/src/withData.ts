import ApolloClient from 'apollo-boost';
import { endpoint } from './endpoint';
import { LOCAL_TOGGLE_QUERY } from './pages/PageSpine';

export default function createClient(token: string) {
  return new ApolloClient({
    uri: endpoint,
    request: (operation) => {
      return new Promise((resolve) => {
        operation.setContext({
          fetchOptions: {
            credentials: 'include'
          }
        });
        resolve();
      });
    },
    headers: {
      authorization: token
    },
    clientState: {
      resolvers: {
        Mutation: {
          toggleSettings(_, variables, { cache }) {
            //read state
            const { settingsOpen } = cache.readQuery({
              query: LOCAL_TOGGLE_QUERY
            });
            // write state
            const data = {
              data: {
                settingsOpen: !settingsOpen,
                friendsOpen: false,
                notificationsOpen: false
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
                friendsOpen: !friendsOpen,
                settingsOpen: false,
                notificationsOpen: false
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
                notificationsOpen: !notificationsOpen,
                friendsOpen: false,
                settingsOpen: false
              }
            };
            cache.writeData(data);
            return data;
          }
        }
      },
      defaults: {
        notificationsOpen: false,
        settingsOpen: false,
        friendsOpen: false
      }
    }
  });
}
