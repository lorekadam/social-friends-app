import gql from 'graphql-tag';

export const USER_QUERY = gql`
  query USER_QUERY($id: String!) {
    user(id: $id) {
      id
      name
    }
  }
`;
