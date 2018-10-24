import * as types from '../actions/types';

export function navChange(nav, params = null) {
  const send = { type: nav };
  if (params !== null) {
    send.payload = params;
  }
  return send;
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

export function profileScreen() {
  return { type: types.PROFILE_SCREEN };
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

export function addGameScreen() {
  return { type: types.ADD_GAME_SCREEN };
}
