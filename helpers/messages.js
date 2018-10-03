module.exports = {
  basic: 'Ups, something went wrong.',
  auth: {
    unique: {
      name: 'Given name already exists.',
      email: 'Account with given email already exists.'
    },
    required: 'All fields are required.',
    name: 'Given name is not valid. 3-16 characters including numbers, without special or spaces.',
    email: 'Given email is not valid.',
    password: 'Password must be longer that 3 characters.',
    noUser: 'User not found.',
    login: 'Invalid email or password.',
    token: {
      noToken: 'No token provided.',
      failed: 'Failed to authenticate token.',
      invalidRefresh: 'Refresh token is invalid'
    }
  },
  requestSended: 'Request sended',
  notificationAdded: 'Notification added',
  friendExists: 'Friend already exists.',
  friendRequest: 'You have friend request from ',
  requestAccepted: 'You have succesfully accepted request!',
  notificationRead: 'You have read notification.',
  duelAdded: 'You have created new duel!',
  duelExists: 'Duel between this players already exists!',
  duelRequest: 'You have duel request from ',
  gameAdded: 'Game successfully added!',
  gameAccepted: 'Game score accepted!'
};
