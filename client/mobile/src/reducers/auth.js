const initialAuthState = { isLoggedIn: false };

export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    case 'First':
      return { ...state, isLoggedIn: true };
    case 'Logout':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}
