import request from "../utils/request";
import qs from "qs";

export async function getCaptcha(params) {
  return request('/requestLoginSmsCode', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function loginByMobilePhone(params) {
  return request('/requestLoginSmsCode', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function register(params) {
  return request('/users', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function login(params) {
  return request(`/login?${qs.stringify({...params})}`);
}

export async function logout() {
  return request(`/logout`);
}

export async function updatePassword(params) {
  return request('/updatePassword', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function getUser(objectId) {
  return request('/users/' + objectId);
}

export async function change(objectId, params) {
  return request('/users/' + objectId, {
    method: 'PUT',
    body: JSON.stringify(params),
  });
}
