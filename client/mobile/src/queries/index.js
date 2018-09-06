import gql from 'graphql-tag';

export const getUser = _id => gql`
  {
    user(_id: "${_id}") {
      email,
      friends{
        _id,
        friendName
      }
    }
  }
`;
