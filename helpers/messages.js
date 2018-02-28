module.exports = {
  basic: 'Ups, something went wrong.',
  auth: {
    required: 'Email and password are required.',
    email: 'Given email is not valid.',
    duplicateEmail: 'Account with given email is created.',
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
