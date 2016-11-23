import request from "../utils/request";
import qs from "qs";

export async function query(params) {
  return request(`/classes/Collection?${qs.stringify({...params, order: '-createdAt'})}`);
}

export async function create(params) {
  return request('/classes/Collection', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function remove(objectId) {
  return request('/classes/Collection/' + objectId, {
    method: 'DELETE',
  });
}
export async function change(objectId, params) {
  return request('/classes/Collection/' + objectId, {
    method: 'PUT',
    body: JSON.stringify(params),
  });
}
