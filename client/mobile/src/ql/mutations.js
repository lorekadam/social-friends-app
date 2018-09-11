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

export const acceptNotification = () => gql`
  mutation AcceptNotification($_id: String!) {
    acceptNotification(_id: $_id) {
      error
      message
      response
    }
  }
`;
