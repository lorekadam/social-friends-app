import gql from 'graphql-tag';

export const CLEAR_LOCAL_STATE_MUTATION = gql`
  mutation {
    clearLocalState @client
  }
`;
