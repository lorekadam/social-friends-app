import gql from 'graphql-tag';
import { store } from '../Fstats';

export const getUser = () => gql`
  {
    user(_id: "${store.getState().user._id}") {
      email,
      notifications{
        _id,
        message,
        requestId,
        fromId,
        type
      },
      friends{
        _id,
        friendName,
        accepted
      }
    }
  }
`;
