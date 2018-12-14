export const emailValidation = (email) => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
  return emailRegex.test(email);
};

export const nameValidation = (username) => {
  const usernameRegex = /^([_A-z0-9]){3,16}$/g;
  return usernameRegex.test(username);
};
