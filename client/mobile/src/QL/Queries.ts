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
  query MY_FRIENDS_CONNECTION_QUERY(
    $where: FriendshipWhereInput
    $orderBy: FriendshipOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    friendshipsConnection(
      where: $where
      orderBy: $orderBy
      skip: $skip
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
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
    }
  }
`;
