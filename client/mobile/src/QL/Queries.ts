import gql from 'graphql-tag';

export const USER_QUERY = gql`
  query USER_QUERY($id: String!) {
    user(id: $id) {
      id
      name
    }
  }
`;

export const MY_FRIENDS_QUERY = gql`
  query MY_FRIENDS_QUERY($skip: Int, $first: Int, $last: Int) {
    friendships(skip: $skip, first: $first, last: $last) {
      accepted
      inviting {
        id
      }
      friend {
        id
        name
      }
    }
  }
`;

export const MY_FRIENDS_CONNECTION_QUERY = gql`
  query MY_FRIENDS_CONNECTION_QUERY {
    friendshipsConnection {
      aggregate {
        count
      }
    }
  }
`;
