import gql from 'graphql-tag';

export const GET_USER = gql`
  {
    user(_id: "5b5771877542c88aaaf0f219") {
      email
    }
  }
`;
