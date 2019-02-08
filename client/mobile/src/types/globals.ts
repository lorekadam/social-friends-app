export enum NotificationTypes {
  FRIEND_INVITE = 'FRIEND_INVITE'
}

export type ArrayTwoOrMore<T> = {
  0: T;
  1: T;
} & Array<T>;

export interface UserSearch {
  name?: string;
  searched: boolean;
  searchResults: any[];
}
