export type Maybe<T> = T | null;

export interface UserWhereInput {
  /** Logical AND on all given filters. */
  AND?: Maybe<UserWhereInput[]>;
  /** Logical OR on all given filters. */
  OR?: Maybe<UserWhereInput[]>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<UserWhereInput[]>;

  id?: Maybe<string>;
  /** All values that are not equal to given value. */
  id_not?: Maybe<string>;
  /** All values that are contained in given list. */
  id_in?: Maybe<string[]>;
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<string[]>;
  /** All values less than the given value. */
  id_lt?: Maybe<string>;
  /** All values less than or equal the given value. */
  id_lte?: Maybe<string>;
  /** All values greater than the given value. */
  id_gt?: Maybe<string>;
  /** All values greater than or equal the given value. */
  id_gte?: Maybe<string>;
  /** All values containing the given string. */
  id_contains?: Maybe<string>;
  /** All values not containing the given string. */
  id_not_contains?: Maybe<string>;
  /** All values starting with the given string. */
  id_starts_with?: Maybe<string>;
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<string>;
  /** All values ending with the given string. */
  id_ends_with?: Maybe<string>;
  /** All values not ending with the given string. */
  id_not_ends_with?: Maybe<string>;

  facebookId?: Maybe<string>;
  /** All values that are not equal to given value. */
  facebookId_not?: Maybe<string>;
  /** All values that are contained in given list. */
  facebookId_in?: Maybe<string[]>;
  /** All values that are not contained in given list. */
  facebookId_not_in?: Maybe<string[]>;
  /** All values less than the given value. */
  facebookId_lt?: Maybe<string>;
  /** All values less than or equal the given value. */
  facebookId_lte?: Maybe<string>;
  /** All values greater than the given value. */
  facebookId_gt?: Maybe<string>;
  /** All values greater than or equal the given value. */
  facebookId_gte?: Maybe<string>;
  /** All values containing the given string. */
  facebookId_contains?: Maybe<string>;
  /** All values not containing the given string. */
  facebookId_not_contains?: Maybe<string>;
  /** All values starting with the given string. */
  facebookId_starts_with?: Maybe<string>;
  /** All values not starting with the given string. */
  facebookId_not_starts_with?: Maybe<string>;
  /** All values ending with the given string. */
  facebookId_ends_with?: Maybe<string>;
  /** All values not ending with the given string. */
  facebookId_not_ends_with?: Maybe<string>;

  name?: Maybe<string>;
  /** All values that are not equal to given value. */
  name_not?: Maybe<string>;
  /** All values that are contained in given list. */
  name_in?: Maybe<string[]>;
  /** All values that are not contained in given list. */
  name_not_in?: Maybe<string[]>;
  /** All values less than the given value. */
  name_lt?: Maybe<string>;
  /** All values less than or equal the given value. */
  name_lte?: Maybe<string>;
  /** All values greater than the given value. */
  name_gt?: Maybe<string>;
  /** All values greater than or equal the given value. */
  name_gte?: Maybe<string>;
  /** All values containing the given string. */
  name_contains?: Maybe<string>;
  /** All values not containing the given string. */
  name_not_contains?: Maybe<string>;
  /** All values starting with the given string. */
  name_starts_with?: Maybe<string>;
  /** All values not starting with the given string. */
  name_not_starts_with?: Maybe<string>;
  /** All values ending with the given string. */
  name_ends_with?: Maybe<string>;
  /** All values not ending with the given string. */
  name_not_ends_with?: Maybe<string>;

  email?: Maybe<string>;
  /** All values that are not equal to given value. */
  email_not?: Maybe<string>;
  /** All values that are contained in given list. */
  email_in?: Maybe<string[]>;
  /** All values that are not contained in given list. */
  email_not_in?: Maybe<string[]>;
  /** All values less than the given value. */
  email_lt?: Maybe<string>;
  /** All values less than or equal the given value. */
  email_lte?: Maybe<string>;
  /** All values greater than the given value. */
  email_gt?: Maybe<string>;
  /** All values greater than or equal the given value. */
  email_gte?: Maybe<string>;
  /** All values containing the given string. */
  email_contains?: Maybe<string>;
  /** All values not containing the given string. */
  email_not_contains?: Maybe<string>;
  /** All values starting with the given string. */
  email_starts_with?: Maybe<string>;
  /** All values not starting with the given string. */
  email_not_starts_with?: Maybe<string>;
  /** All values ending with the given string. */
  email_ends_with?: Maybe<string>;
  /** All values not ending with the given string. */
  email_not_ends_with?: Maybe<string>;

  password?: Maybe<string>;
  /** All values that are not equal to given value. */
  password_not?: Maybe<string>;
  /** All values that are contained in given list. */
  password_in?: Maybe<string[]>;
  /** All values that are not contained in given list. */
  password_not_in?: Maybe<string[]>;
  /** All values less than the given value. */
  password_lt?: Maybe<string>;
  /** All values less than or equal the given value. */
  password_lte?: Maybe<string>;
  /** All values greater than the given value. */
  password_gt?: Maybe<string>;
  /** All values greater than or equal the given value. */
  password_gte?: Maybe<string>;
  /** All values containing the given string. */
  password_contains?: Maybe<string>;
  /** All values not containing the given string. */
  password_not_contains?: Maybe<string>;
  /** All values starting with the given string. */
  password_starts_with?: Maybe<string>;
  /** All values not starting with the given string. */
  password_not_starts_with?: Maybe<string>;
  /** All values ending with the given string. */
  password_ends_with?: Maybe<string>;
  /** All values not ending with the given string. */
  password_not_ends_with?: Maybe<string>;

  resetToken?: Maybe<string>;
  /** All values that are not equal to given value. */
  resetToken_not?: Maybe<string>;
  /** All values that are contained in given list. */
  resetToken_in?: Maybe<string[]>;
  /** All values that are not contained in given list. */
  resetToken_not_in?: Maybe<string[]>;
  /** All values less than the given value. */
  resetToken_lt?: Maybe<string>;
  /** All values less than or equal the given value. */
  resetToken_lte?: Maybe<string>;
  /** All values greater than the given value. */
  resetToken_gt?: Maybe<string>;
  /** All values greater than or equal the given value. */
  resetToken_gte?: Maybe<string>;
  /** All values containing the given string. */
  resetToken_contains?: Maybe<string>;
  /** All values not containing the given string. */
  resetToken_not_contains?: Maybe<string>;
  /** All values starting with the given string. */
  resetToken_starts_with?: Maybe<string>;
  /** All values not starting with the given string. */
  resetToken_not_starts_with?: Maybe<string>;
  /** All values ending with the given string. */
  resetToken_ends_with?: Maybe<string>;
  /** All values not ending with the given string. */
  resetToken_not_ends_with?: Maybe<string>;

  resetTokenExpiry?: Maybe<number>;
  /** All values that are not equal to given value. */
  resetTokenExpiry_not?: Maybe<number>;
  /** All values that are contained in given list. */
  resetTokenExpiry_in?: Maybe<number[]>;
  /** All values that are not contained in given list. */
  resetTokenExpiry_not_in?: Maybe<number[]>;
  /** All values less than the given value. */
  resetTokenExpiry_lt?: Maybe<number>;
  /** All values less than or equal the given value. */
  resetTokenExpiry_lte?: Maybe<number>;
  /** All values greater than the given value. */
  resetTokenExpiry_gt?: Maybe<number>;
  /** All values greater than or equal the given value. */
  resetTokenExpiry_gte?: Maybe<number>;

  createdAt?: Maybe<DateTime>;
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<DateTime>;
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<DateTime[]>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<DateTime[]>;
  /** All values less than the given value. */
  createdAt_lt?: Maybe<DateTime>;
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<DateTime>;
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<DateTime>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<DateTime>;

  updatedAt?: Maybe<DateTime>;
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<DateTime>;
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<DateTime[]>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<DateTime[]>;
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<DateTime>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<DateTime>;
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<DateTime>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<DateTime>;
}

export interface FriendshipWhereInput {
  /** Logical AND on all given filters. */
  AND?: Maybe<FriendshipWhereInput[]>;
  /** Logical OR on all given filters. */
  OR?: Maybe<FriendshipWhereInput[]>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<FriendshipWhereInput[]>;

  id?: Maybe<string>;
  /** All values that are not equal to given value. */
  id_not?: Maybe<string>;
  /** All values that are contained in given list. */
  id_in?: Maybe<string[]>;
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<string[]>;
  /** All values less than the given value. */
  id_lt?: Maybe<string>;
  /** All values less than or equal the given value. */
  id_lte?: Maybe<string>;
  /** All values greater than the given value. */
  id_gt?: Maybe<string>;
  /** All values greater than or equal the given value. */
  id_gte?: Maybe<string>;
  /** All values containing the given string. */
  id_contains?: Maybe<string>;
  /** All values not containing the given string. */
  id_not_contains?: Maybe<string>;
  /** All values starting with the given string. */
  id_starts_with?: Maybe<string>;
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<string>;
  /** All values ending with the given string. */
  id_ends_with?: Maybe<string>;
  /** All values not ending with the given string. */
  id_not_ends_with?: Maybe<string>;

  accepted?: Maybe<boolean>;
  /** All values that are not equal to given value. */
  accepted_not?: Maybe<boolean>;

  createdAt?: Maybe<DateTime>;
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<DateTime>;
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<DateTime[]>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<DateTime[]>;
  /** All values less than the given value. */
  createdAt_lt?: Maybe<DateTime>;
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<DateTime>;
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<DateTime>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<DateTime>;

  updatedAt?: Maybe<DateTime>;
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<DateTime>;
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<DateTime[]>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<DateTime[]>;
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<DateTime>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<DateTime>;
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<DateTime>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<DateTime>;

  user?: Maybe<UserWhereInput>;

  friend?: Maybe<UserWhereInput>;

  inviting?: Maybe<UserWhereInput>;
}

export enum UserOrderByInput {
  IdAsc = "id_ASC",
  IdDesc = "id_DESC",
  FacebookIdAsc = "facebookId_ASC",
  FacebookIdDesc = "facebookId_DESC",
  NameAsc = "name_ASC",
  NameDesc = "name_DESC",
  EmailAsc = "email_ASC",
  EmailDesc = "email_DESC",
  PasswordAsc = "password_ASC",
  PasswordDesc = "password_DESC",
  ResetTokenAsc = "resetToken_ASC",
  ResetTokenDesc = "resetToken_DESC",
  ResetTokenExpiryAsc = "resetTokenExpiry_ASC",
  ResetTokenExpiryDesc = "resetTokenExpiry_DESC",
  CreatedAtAsc = "createdAt_ASC",
  CreatedAtDesc = "createdAt_DESC",
  UpdatedAtAsc = "updatedAt_ASC",
  UpdatedAtDesc = "updatedAt_DESC"
}

export enum FriendshipOrderByInput {
  IdAsc = "id_ASC",
  IdDesc = "id_DESC",
  AcceptedAsc = "accepted_ASC",
  AcceptedDesc = "accepted_DESC",
  CreatedAtAsc = "createdAt_ASC",
  CreatedAtDesc = "createdAt_DESC",
  UpdatedAtAsc = "updatedAt_ASC",
  UpdatedAtDesc = "updatedAt_DESC"
}

export enum NotificationType {
  FriendInvite = "FRIEND_INVITE"
}

export type DateTime = any;

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Types
// ====================================================

export interface Query {
  me: User;

  user?: Maybe<FindUser>;

  users: (Maybe<FindUser>)[];

  friendsToInvite: (Maybe<FindUser>)[];

  friendships: Friendship[];

  friendshipsConnection: FriendshipConnection;

  notifications: Notification[];

  unviewedNotifications: SuccessMessage;
}

export interface User {
  id: string;

  name?: Maybe<string>;

  email: string;

  jwt?: Maybe<string>;
}

export interface FindUser {
  id: string;

  name: string;
}

export interface Friendship {
  id: string;

  user: User;

  friend: User;

  inviting: User;

  accepted: boolean;
}

/** A connection to a list of items. */
export interface FriendshipConnection {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: (Maybe<FriendshipEdge>)[];

  aggregate: AggregateFriendship;
}

/** Information about pagination in a connection. */
export interface PageInfo {
  /** When paginating forwards, are there more items? */
  hasNextPage: boolean;
  /** When paginating backwards, are there more items? */
  hasPreviousPage: boolean;
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<string>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<string>;
}

/** An edge in a connection. */
export interface FriendshipEdge {
  /** The item at the end of the edge. */
  node: Friendship;
  /** A cursor for use in pagination. */
  cursor: string;
}

export interface AggregateFriendship {
  count: number;
}

export interface Notification {
  id: string;

  user: User;

  type: NotificationType;

  friendship?: Maybe<Friendship[]>;

  viewed: boolean;

  accepted: boolean;
}

export interface SuccessMessage {
  message?: Maybe<string>;
}

export interface Mutation {
  signup: User;

  signin: User;

  signinFacebook: User;

  updateUserName: SuccessMessage;

  requestReset?: Maybe<SuccessMessage>;

  resetPassword: User;

  inviteFriend: SuccessMessage;

  acceptFriendInvite: SuccessMessage;

  acceptFriend: SuccessMessage;

  removeFriend: SuccessMessage;

  viewNotifications: SuccessMessage;
}

// ====================================================
// Arguments
// ====================================================

export interface UserQueryArgs {
  id: string;
}
export interface UsersQueryArgs {
  where?: Maybe<UserWhereInput>;

  orderBy?: Maybe<UserOrderByInput>;

  skip?: Maybe<number>;

  first?: Maybe<number>;
}
export interface FriendsToInviteQueryArgs {
  where?: Maybe<UserWhereInput>;

  orderBy?: Maybe<UserOrderByInput>;

  skip?: Maybe<number>;

  first?: Maybe<number>;
}
export interface FriendshipsQueryArgs {
  where?: Maybe<FriendshipWhereInput>;

  orderBy?: Maybe<FriendshipOrderByInput>;

  skip?: Maybe<number>;

  first?: Maybe<number>;

  last?: Maybe<number>;
}
export interface FriendshipsConnectionQueryArgs {
  where?: Maybe<FriendshipWhereInput>;

  orderBy?: Maybe<FriendshipOrderByInput>;

  skip?: Maybe<number>;

  after?: Maybe<string>;

  before?: Maybe<string>;

  first?: Maybe<number>;

  last?: Maybe<number>;
}
export interface SignupMutationArgs {
  email: string;

  password: string;

  name: string;
}
export interface SigninMutationArgs {
  email: string;

  password: string;
}
export interface SigninFacebookMutationArgs {
  email: string;

  facebookId: string;
}
export interface UpdateUserNameMutationArgs {
  name: string;
}
export interface RequestResetMutationArgs {
  email: string;
}
export interface ResetPasswordMutationArgs {
  resetToken: string;

  password: string;

  confirmPassword: string;
}
export interface InviteFriendMutationArgs {
  name?: Maybe<string>;

  id?: Maybe<string>;
}
export interface AcceptFriendInviteMutationArgs {
  id: string;
}
export interface AcceptFriendMutationArgs {
  friendId: string;
}
export interface RemoveFriendMutationArgs {
  friendId: string;
}
export interface ViewNotificationsMutationArgs {
  view?: Maybe<boolean>;
}
