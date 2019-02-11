import { FindUser } from '../QL/types';

export enum NotificationTypes {
  FRIEND_INVITE = 'FRIEND_INVITE'
}

export type ArrayTwoOrMore<T> = {
  0: T;
  1: T;
} & Array<T>;

export interface UserSearch {
  data: { friendsToInvite: [FindUser] };
  name?: string;
  searched?: boolean;
}
