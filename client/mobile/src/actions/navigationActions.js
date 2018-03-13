export function navChange(nav) {
  return { type: nav };
}

export function loginScreen() {
  return { type: 'LOGIN_SCREEN' };
}

export function registerScreen() {
  return { type: 'REGISTER_SCREEN' };
}

export function dashboardScreen() {
  return { type: 'DASHBOARD_SCREEN' };
}
