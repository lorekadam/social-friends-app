import gql from 'graphql-tag';

export const GET_USER = gql`
  {
    user(_id: "5b6732ffbf9f55454f624ecc") {
      email
    }
  }
`;
