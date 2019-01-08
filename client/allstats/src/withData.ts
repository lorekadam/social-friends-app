import ApolloClient from 'apollo-boost';
import { endpoint } from '../config';
import { LOCAL_STATE_QUERY } from './pages/Profile';

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
          toggleCart(_, variables, { cache }) {
            //read state
            const { cartOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY
            });
            // write state
            const data = {
              data: { cartOpen: !cartOpen }
            };
            cache.writeData(data);
            return data;
          }
        }
      },
      defaults: {
        cartOpen: false
      }
    }
  });
}
