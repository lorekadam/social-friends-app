import ApolloClient from 'apollo-boost';
import { endpoint } from './config';
import { LOCAL_SETTINGS_QUERY } from './pages/PageSpine';

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
      authorization: token ? `Bearer ${token}` : ''
    },
    clientState: {
      resolvers: {
        Mutation: {
          toggleSettings(_, variables, { cache }) {
            //read state
            const { settingsOpen } = cache.readQuery({
              query: LOCAL_SETTINGS_QUERY
            });
            // write state
            const data = {
              data: { settingsOpen: !settingsOpen }
            };
            cache.writeData(data);
            return data;
          }
        }
      },
      defaults: {
        settingsOpen: false
      }
    }
  });
}
