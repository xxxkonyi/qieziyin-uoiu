import request from "../utils/request";
import qs from "qs";

export async function create(params) {
  return request('/classes/Collection', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function query(params) {
  return request(`/classes/Collection?${qs.stringify({...params, order: '-createdAt'})}`);
}
