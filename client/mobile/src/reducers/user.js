export default function reducer(
  state = {
    error: '',
    authenticated: false,
    loader: false,
    loaderType: ''
  },
  action
) {
  switch (action.type) {
    case 'AUTH_USER': {
      return {
        ...state,
        authenticated: true
      };
    }
  }
  return state;
}
