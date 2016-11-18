import {query} from "../services/news";
import {parse} from "qs";

const STATE = {
  loading: false,
  list: [],
  current: 1,
  pageSize: 10,
  total: null,
  sortColumn: 'createdAt',
  sortOrder: 'descend',
  field: '',
  keyword: '',
};

export default {

  namespace: 'news',

  state: STATE,

  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        if (location.pathname === '/news') {
          const query = location.query;
          dispatch({
            type: 'query',
            payload: {
              ...query,
              sortColumn: !query.sortColumn ? STATE.sortColumn : query.sortColumn,
              sortOrder: !query.sortOrder ? STATE.sortOrder : query.sortOrder,
              current: !query.current ? STATE.current : parseInt(query.current),
              pageSize: !query.pageSize ? STATE.pageSize : parseInt(query.pageSize),
            }
          });
        }
      });
    },
  },

  effects: {
    *query({payload}, {call, put}) {
      yield put({type: 'showLoading'});
      yield put({type: 'updateQueryKey', payload});
      const {data} = yield call(query, parse(payload));

      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            ...payload,
            list: data.results,
            total: data.count,
          },
        });
      }
    }
  },

  reducers: {
    showLoading(state) {
      return {...state, loading: true};
    },
    querySuccess(state, action) {
      return {...state, ...action.payload, loading: false};
    },
    updateQueryKey(state, action) {
      return {...state, ...action.payload};
    },
  },

};
