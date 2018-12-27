import ApolloClient from 'apollo-boost';
import { endpoint } from '../config';

export default function createClient(token) {
  return new ApolloClient({
    uri: endpoint,
    request: (operation) => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include'
        }
      });
    },
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  });
}
