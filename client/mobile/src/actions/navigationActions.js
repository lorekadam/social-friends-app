import * as types from '../actions/types';

export function navChange(nav) {
  return { type: nav };
}

export function back() {
  return { type: types.BACK };
}

export function loginScreen() {
  return { type: types.LOGIN_SCREEN };
}

export function registerScreen() {
  return { type: types.REGISTER_SCREEN };
}

export function dashboardScreen() {
  return { type: types.DASHBOARD_SCREEN };
}

export function cameraScreen() {
  return { type: types.CAMERA_SCREEN };
}

export function friendsScreen() {
  return { type: types.FRIENDS_SCREEN };
}

export function duelsScreen() {
  return { type: types.DUELS_SCREEN };
}

export function tournamentsScreen() {
  return { type: types.TOURNAMENTS_SCREEN };
}

export function liguesScreen() {
  return { type: types.LIGUES_SCREEN };
}
