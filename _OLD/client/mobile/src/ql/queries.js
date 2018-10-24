import gql from 'graphql-tag';
import { store } from '../Fstats';

export const getUser = () => gql`
  {
    user(_id: "${store.getState().user._id}") {
      email,
      username,
      notifications{
        _id,
        message,
        requestId,
        fromId,
        type
      },
      friends{
        _id,
        friendId,
        friendName,
        accepted
      }
    }
  }
`;

export const getDuels = () => gql`
  {
    user(_id: "${store.getState().user._id}") {
      duels{
        _id,
        name
      }
    }
  }
`;

export const getDuelDetails = () => gql`
{
  
}
`;
