module.exports = {
  basic: 'Ups, something went wrong.',
  auth: {
    required: 'All fields are required.',
    username:
      'Given username is not valid. 3-16 characters including numbers, without special or spaces.',
    email: 'Given email is not valid.',
    duplicateEmail: 'Account with given email already exist.',
    password: 'Password must be longer that 3 characters.',
    noUser: 'No user found.',
    login: 'Invalid email or password.',
    token: {
      noToken: 'No token provided.',
      failed: 'Failed to authenticate token.',
      invalidRefresh: 'Refresh token is invalid'
    }
  }
};
