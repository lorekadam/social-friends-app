import { FindUser } from './types';

export enum NotificationTypes {
  FRIEND_INVITE = 'FRIEND_INVITE'
}

export type ArrayTwoOrMore<T> = {
  0: T;
  1: T;
} & Array<T>;

export interface UserToInvite extends FindUser {
  invited: boolean;
}

export interface UserSearch {
  data: { friendsToInvite?: UserToInvite[] };
  name?: string;
  searched?: boolean;
}
