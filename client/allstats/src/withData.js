import ApolloClient from 'apollo-boost';
import { endpoint } from '../config';

export default function createClient() {
  return new ApolloClient({
    uri: endpoint,
    request: (operation) => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include'
        }
      });
    }
  });
}
