import * as types from '../actions/types';

export function navChange(nav) {
  return { type: nav };
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
