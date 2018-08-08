module.exports = {
  basic: 'Ups, something went wrong.',
  auth: {
    required: 'All fields are required.',
    username:
      'Given username is not valid. 3-16 characters including numbers, without special or spaces.',
    email: 'Given email is not valid.',
    duplicateEmail: 'Account with given email already exist.',
    password: 'Password must be longer that 3 characters.',
    noUser: 'User not found.',
    login: 'Invalid email or password.',
    token: {
      noToken: 'No token provided.',
      failed: 'Failed to authenticate token.',
      invalidRefresh: 'Refresh token is invalid'
    }
  },
  friendExists: 'Friend already exists.',
  friendRequest: 'You have friend request from ',
  friendRequestAccepted: 'You have succesfully accepted request!'
};
