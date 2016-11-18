import request from "../utils/request";
import qs from "qs";

export async function query(params) {

  const temp = {
    count: 1,
    skip: (params.current - 1) * params.pageSize,
    limit: params.pageSize,
    order: !params.sortOrder ? null : (params.sortOrder === 'descend' ? '-' : '') + params.sortColumn
  };

  return request(`/classes/News?${qs.stringify({...params, ...temp})}`);
}
