import gql from 'graphql-tag';
import { store } from '../Fstats';

export const friendInvite = () => gql`
  mutation AddFriend($friendName: String!){
    addFriend(_id: "${store.getState().user._id}", friendName: $friendName){
        error,
        message,
        response
    }
  }
`;
