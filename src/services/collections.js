import request from "../utils/request";
import qs from "qs";

export async function query(params) {

  const temp = {
    order: '-createdAt'
  };

  return request(`/classes/Collections?${qs.stringify({...params, ...temp})}`);
}
